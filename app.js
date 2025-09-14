const encryptedApiKey = "4GKPfk6VbWrmpxiGZtMtR5bLYxpL1YRTC/szPhMjFIVBRbWme6P1IkOj9VJa40UXSPgn3yYLD9ikmnkAokUs4i4jjKnvUSlpxwmdnAUD7HI="; 
function decryptApiKey(encryptedKey, passphrase) {
    try {
        return CryptoJS.AES.decrypt(encryptedKey, passphrase).toString(CryptoJS.enc.Utf8);
    } 
    catch (error) {
        console.error("Decryption error:", error);
        throw new Error("Failed to decrypt API key");
    }
}

async function askquestion() {

    const secretPassphrase = "YourSecretPassphrase";
    const decryptedApiKey = decryptApiKey(encryptedApiKey, secretPassphrase);


    const question=document.getElementById('box').value;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${decryptedApiKey}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: question }
                        ]
                    }
                ]
            })
        });
    
        if (!response.ok){
            throw new Error('Network response was not ok');
        }

        const data=await response.json();
        const answer=data.candidates[0].content.parts[0].text;
        document.querySelector(".answer").innerText=answer;

    }
    catch (error) {
        console.error("Error: ",error);
        document.querySelector(".answer").innerText='Failed to get a response from the Gemini AI.';
    }
}
