// OneDriveにファイルをアップロードする関数
async function uploadFileToOneDrive(accessToken, file) {
    const url = "https://graph.microsoft.com/v1.0/me/drive/root:/"+ file.name +":/content";
  
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': file.type
        },
        body: file
      });
  
      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        const error = await response.text();
        throw new Error(`Error:${error}`);
      }
    } catch (error) {
      console.error("Upload failed", error);
      throw error;
    }
  }
  
  // ボタンクリック時の処理
  document.getElementById('uploadBtn').addEventListener('click', async () => {
    const accessToken = document.getElementById('accessToken').value;
    const fileInput = document.getElementById('fileInput');
    const resultDiv = document.getElementById('result');
  
    if (!accessToken) {
      resultDiv.textContent = "Error: Access token is required.";
      return;
    }
  
    if (!fileInput.files.length) {
      resultDiv.textContent = "Error: Please select a file.";
      return;
    }
  
    const file = fileInput.files[0];
  
    try {
      const uploadResult = await uploadFileToOneDrive(accessToken, file);
      resultDiv.textContent = `Success! File uploaded: ${uploadResult.name}`;
    } catch (error) {
      resultDiv.textContent = `Upload failed: ${error.message}`;
    }
  });