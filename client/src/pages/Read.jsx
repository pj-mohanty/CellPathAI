import { useParams } from 'react-router-dom';

function Read() {
    const slug = useParams();

    const generateSummary = async (topic) => {
        setError(null);
        setLoadingTopic(topic);
        const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
        
        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are an expert biology tutor who explains concepts clearly and engagingly.",
                },
                {
                    role: "user",
                    content: `Write a detailed, easy-to-understand explanation of ${slug} in biology. Include 2–3 paragraphs with biological importance, key steps, and analogies where helpful.`,
                },
            ],
            max_tokens: 400,
            temperature: 0.7,
        }),
      });

      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      const data = await response.json();
      const summary = data.choices[0].message.content;

      setSummaries((prev) => ({ ...prev, [topic]: summary }));
    } catch (err) {
      console.error("Error generating summary:", err);
      setError("Failed to generate summary. Please try again later.");
    } finally {
      setLoadingTopic(null);
    }
  };
    
    return (
        <div></div>
    );
}

export default Read;