import { useState, useEffect } from "react";

const useTranslate = (text, targetLanguage) => {
  const [translatedText, setTranslatedText] = useState("");
  const [error, setError] = useState(null);
  const apiKey = "API_KEY";
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  useEffect(() => {
    const translateText = async () => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            q: text,
            target: targetLanguage,
          }),
        });

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error.message);
        }
        setTranslatedText(data.data.translations[0].translatedText);
      } catch (err) {
        setError(err.message);
      }
    };

    if (text) {
      translateText();
    }
  }, [text, targetLanguage]);

  return { translatedText, error };
};

export default useTranslate;
