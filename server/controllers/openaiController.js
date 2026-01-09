import OpenAI from 'openai';
import { db } from '../server.js';

export const generateBlocks = async (req, res) => {
    try {
        // Initialize inside request to ensure env vars are loaded
        const apiKey = process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY;

        if (!apiKey) {
            throw new Error('OPENAI_API_KEY environment variable is missing. Please add it to your .env file.');
        }

        const openai = new OpenAI({
            apiKey: apiKey,
        });

        const { systemPrompt, userContent } = req.body;

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userContent },
            ],
            temperature: 0.1,
            max_tokens: 4000,
        });

        const content = response.choices[0].message.content;

        // Save to Database
        if (req.userId) {
            const sql = `INSERT INTO generations (user_id, prompt, content, framework, thumbnail) VALUES (?, ?, ?, ?, ?)`;

            let promptSummary = '';
            let thumbnail = null;

            if (Array.isArray(userContent)) {
                // Image input
                promptSummary = 'Image Upload';
                // Find the image part
                const imagePart = userContent.find(p => p.type === 'image_url');
                if (imagePart) {
                    thumbnail = imagePart.image_url.url;
                }
            } else {
                // Text input
                promptSummary = userContent.substring(0, 100);
            }

            db.run(sql, [req.userId, promptSummary, content, 'gutenberg', thumbnail], function (err) {
                if (err) console.error("Error saving generation:", err.message);
                else console.log(`[DB] Saved generation ${this.lastID} for user ${req.userId}`);
            });
        }

        res.json({ content });
    } catch (error) {
        console.error("OpenAI API Error:", error);
        res.status(500).json({ error: error.message });
    }
};
