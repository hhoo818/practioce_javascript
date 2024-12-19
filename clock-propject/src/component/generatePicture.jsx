export const generatePicture = async ({
  prompt,
  negative_prompt,
  height,
  width,
}) => {
  try {
    const response = await fetch("https://2f51-34-125-200-70.ngrok-free.app", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
        negative_prompt: negative_prompt,
        height: height || 768,
        width: width || 552,
        guidance_scale: 8,
        num_inference_steps: 25,
        seed: -1,
      }),
    });

    if (!response.ok) {
      throw new Error("サーバーエラー: " + response.status);
    }

    const blob = await response.blob();
    const imgURL = URL.createObjectURL(blob);

    return (
      <img
        src={imgURL}
        alt="Generated Image"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          border: "1px solid #ccc",
          objectFit: "contain",
        }}
      />
    );
  } catch (error) {
    console.error("エラーが発生しました:", error);
    return (
      <p style={{ color: "red" }}>画像の生成に失敗しました: {error.message}</p>
    );
  }
};

export const hatsuneMikuPrompt = {
  morning:
    "masterpiece, best quality, high quality, detailed, <lora:hatsunemiku1-000006:0.9>,hatsune miku  1girl,sleepy,in the morning,kneeling in bed,morning,shy,:d",
  lunch:
    "masterpiece, best quality, highres, gracemiku,<lora:hatsune_miku_(project_sekai)_v1:0.9>, grass, wariza, smile,at noon,:d",
  night:
    "<lora:hatsunemiku1-000006:0.9>,hatsune miku, masterpiece, best quality,night sky,full moon, futuristic city background, dynamic angle,:d",
  midNight:
    "<lora:hatsunemiku1-000006:0.9>,hatsune miku, masterpiece, best quality, very aesthetic, absurdres, dark room, at midnight,(sleeping face, closed eyes, cushion, lying) ,:d",
};

export const kagamineRinPrompt = {
  morning:
    "masterpiece, best quality, high quality, detailed, <lora:KagamineRinLORA:0.9>, Kagamine Rin,   1girl,sleepy,in the morning,kneeling in bed,morning,shy,:d",
  lunch:
    "masterpiece, best quality, highres, gracemiku, <lora:KagamineRinLORA:0.9>, Kagamine Rin, grass, wariza, smile,at noon,:d",
  night:
    "<lora:KagamineRinLORA:0.9>, Kagamine Rin,  masterpiece, best quality,night sky,full moon, futuristic city background, dynamic angle,:d",
  midNight:
    "<lora:KagamineRinLORA:0.9>, Kagamine Rin, masterpiece, best quality, very aesthetic, absurdres, dark room, at midnight,(sleeping face, closed eyes, cushion, lying), :d",
};

export const kagamineRenPrompt = {
  morning:
    "masterpiece, best quality, high quality, detailed, <lora:KagamineLenV1:0.9>, Kagamine Len, 1girl,sleepy,in the morning,kneeling in bed,morning,shy,:d",
  lunch:
    "masterpiece, best quality, highres, nigomiku, <lora:KagamineLenV1:0.9>, Kagamine Len, grass, wariza, smile, heterochromia, aqua eyes, pink eyes,:d",
  night:
    "<lora:KagamineLenV1:0.9>,  1boy, sailor_collar, Kagamine_Len, yellow hair, masterpiece, best quality,night sky,full moon, futuristic city background, dynamic angle,:d, short pants and sleeve, white shirt, :d",
  midNight:
    "<lora:KagamineLenV1:0.9>1boy, sailor_collar, Kagamine_Len, yellow hair, masterpiece, best quality, very aesthetic, absurdres, dark room, at midnight,(sleeping face, closed eyes, cushion, lying) ,:d, short pants and sleeve, white shirt, :d",
};

export const NegativeWord =
  "EasyNegative, (score_5,score_4,score_3,score_2,score_1),(worst quality, low quality:1.3),dark skin,extra arms,extra legs,monochrome,greyscale,render,old,wrinkles,ugly,bad,wrong,horror,watermark,subtitled,(worst quality, low quality:1.4), (realistic, lip, nose, tooth, rouge, lipstick, eyeshadow:1.0), (dusty sunbeams:1.0), (abs, muscular, rib:1.0), (depth of field, bokeh, blurry:1.4), (greyscale, monochrome:1.0), text, title, logo, signature";

// 時間帯に応じた prompt を取得する関数
export const getPromptByTime = (theme) => {
  const now = new Date();
  const hour = now.getHours();
  if (theme === "miku") {
    if (hour >= 6 && hour < 11) {
      return hatsuneMikuPrompt.morning;
    } else if (hour >= 11 && hour < 17) {
      return hatsuneMikuPrompt.lunch;
    } else if (hour >= 17 && hour < 23) {
      return hatsuneMikuPrompt.night;
    } else {
      return hatsuneMikuPrompt.midNight;
    }
  } else {
    if (hour >= 6 && hour < 11) {
      return kagamineRinPrompt.morning;
    } else if (hour >= 11 && hour < 17) {
      return kagamineRinPrompt.lunch;
    } else if (hour >= 17 && hour < 23) {
      return kagamineRenPrompt.night;
    } else {
      return kagamineRenPrompt.midNight;
    }
  }
};
