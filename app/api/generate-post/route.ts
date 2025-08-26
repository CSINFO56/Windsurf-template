import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    const style = formData.get('style') as string;

    if (!image) {
      return NextResponse.json(
        { error: 'Une image est requise' },
        { status: 400 }
      );
    }

    // Convertir l'image en base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');
    const dataURI = `data:${image.type};base64,${base64Image}`;

    // Instructions basées sur le style sélectionné
    const stylePrompts: Record<string, string> = {
      professional: "Ton professionnel, formel et informatif. Utilisez un langage business et orienté résultats.",
      inspirational: "Ton inspirant et motivant. Utilisez des anecdotes, des citations et un langage émotionnel.",
      casual: "Ton décontracté et conversationnel. Utilisez un langage plus personnel et informel.",
      storytelling: "Format narratif avec une introduction captivante, un développement et une conclusion. Racontez une histoire.",
      educational: "Ton éducatif et explicatif. Partagez des connaissances, expliquez des concepts et donnez des conseils pratiques."
    };

    const stylePrompt = stylePrompts[style] || stylePrompts.professional;
    
    // Appel à l'API OpenAI pour analyser l'image et générer le post
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Tu es un expert en rédaction de posts LinkedIn engageants. Tu vas analyser une image et créer un post LinkedIn original inspiré par son contenu. 
          
          Instructions:
          - Extrais le contenu textuel de l'image si présent
          - Analyse le contexte et le sujet de l'image
          - Crée un post LinkedIn inspiré par ce contenu (ne copie pas le texte tel quel)
          - ${stylePrompt}
          - Longueur: entre 100 et 200 mots
          - Inclure 3-5 hashtags pertinents à la fin
          - Ne pas mentionner que le contenu est basé sur une capture d'écran
          - Format: paragraphes séparés par des sauts de ligne`
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Voici une image. Crée un post LinkedIn engageant basé sur son contenu:" },
            { type: "image_url", image_url: { url: dataURI } }
          ]
        }
      ],
      max_tokens: 500,
    });

    // Récupération du texte généré
    const generatedPost = response.choices[0].message.content || "Impossible de générer un post. Veuillez réessayer.";

    // Get current user
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      // Save post to database
      const post = await prisma.post.create({
        data: {
          content: generatedPost,
          style,
          userId: user.id,
          // Store image URL if we had image storage implemented
          imageUrl: null
        }
      });
      
      return NextResponse.json({ post: generatedPost, postId: post.id });
    }
    
    // Renvoi de la réponse si pas d'utilisateur connecté
    return NextResponse.json({ post: generatedPost });
    
  } catch (error: any) {
    console.error('Error processing image:', error);
    return NextResponse.json(
      { error: `Une erreur est survenue: ${error.message}` },
      { status: 500 }
    );
  }
}
