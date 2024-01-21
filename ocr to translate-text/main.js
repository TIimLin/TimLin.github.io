document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('process-image-button').addEventListener('click', async () => {

        var inputImage = document.getElementById('inputImage').value;
        if (!inputImage) {
            alert('請輸入圖片網址！');
            return;
        }

        // 清除 texts 的值
        texts = [];

        // 隱藏元素並清空內容
        var hiddenElements = Array.from(document.getElementsByClassName('hidden'));
        for (var i = 0; i < hiddenElements.length; i++) {
            hiddenElements[i].style.display = 'none';
            // hiddenElements[i].innerHTML = ' ';
        }

        await processImage();
        await processTranslate();

        // 顯示元素
        for (var i = 0; i < hiddenElements.length; i++) {
            hiddenElements[i].style.display = 'block';
        }
    });

    let selectedFile;
    // 當選擇的檔案變更時，保存選擇的檔案
    document.getElementById('uploadImage').addEventListener('change', async (e) => {
        selectedFile = e.target.files[0];

        // 更新檔案名稱
        document.getElementById('fileName').textContent = selectedFile.name;
    });

    // 當按下按鈕時，處理選擇的檔案
    document.getElementById('upload-image-button').addEventListener('click', async () => {

        var uploadImage = document.getElementById('uploadImage').files;
        if (!uploadImage.length) {
            alert('請上傳檔案！');
            return;
        }

        if (selectedFile) {
            // 清除 texts 的值
            texts = [];

            // 隱藏元素並清空內容
            var hiddenElements = Array.from(document.getElementsByClassName('hidden'));
            for (var i = 0; i < hiddenElements.length; i++) {
                hiddenElements[i].style.display = 'none';
                // hiddenElements[i].innerHTML = ' ';
            }

            // 在此处调用 processImageFile 函数
            await processImageFile(selectedFile);
            await processTranslate();

            // 顯示元素
            for (var i = 0; i < hiddenElements.length; i++) {
                hiddenElements[i].style.display = 'block';
            }
        }
    });
});

let texts = [];

async function processImage() {
    let endpoint = "https://tim082201-computer.cognitiveservices.azure.com/";
    if (!subscriptionKey) { throw new Error('Set your environment variables for your subscription key and endpoint.'); }

    var uriBase = endpoint + "vision/v2.1/ocr";

    var sourceImageUrl = document.getElementById("inputImage").value;
    document.querySelector("#sourceImage").src = sourceImageUrl;

    try {
        let response = await fetch(uriBase, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': subscriptionKey
            },
            body: JSON.stringify({ url: sourceImageUrl })
        });

        let data = await response.json();
        let responseTextArea = document.getElementById('responseTextArea');
        if (responseTextArea) {
            responseTextArea.value = JSON.stringify(data, null, 2);
        }
        let recognitionCardNumber = document.getElementById('RecognitionCardNumber');
        if (recognitionCardNumber) {
            recognitionCardNumber.innerHTML = '';
            for (let x of data.regions) {
                for (let y of x.lines) {
                    for (let z of y.words) {
                        recognitionCardNumber.append(z.text + " ");
                        texts.push(z.text);
                    }
                }
            }
        }
    } catch (error) {
        console.error(error);
        console.log(error);
    }
};

//增加本地上傳圖片功能
async function processImageFile(imageObject) {
    let endpoint = "https://tim082201-computer.cognitiveservices.azure.com/";
    if (!subscriptionKey) { throw new Error('Set your environment variables for your subscription key and endpoint.'); }

    var uriBase = endpoint + "vision/v2.1/ocr";

    var sourceImageUrl = URL.createObjectURL(imageObject);
    document.querySelector("#sourceImage").src = sourceImageUrl;

    let formData = new FormData();
    formData.append('image', imageObject);

    try {
        let response = await fetch(uriBase, {
            method: 'POST',
            headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey
            },
            // Request body
            body: formData
        });

        let data = await response.json();
        let responseTextArea = document.getElementById('responseTextArea');
        if (responseTextArea) {
            responseTextArea.value = JSON.stringify(data, null, 2);
        }
        let recognitionCardNumber = document.getElementById('RecognitionCardNumber');
        if (recognitionCardNumber) {
            recognitionCardNumber.innerHTML = '';
            for (let x of data.regions) {
                for (let y of x.lines) {
                    for (let z of y.words) {
                        recognitionCardNumber.append(z.text + " ");
                        texts.push(z.text);
                    }
                }
            }
        }
    } catch (error) {
        console.error(error);
        console.log(error);
    }

};


async function processTranslate() {
    let uriBase = "https://api.cognitive.microsofttranslator.com/translate";
    let params = new URLSearchParams({
        "api-version": "3.0",
        "to": "zh-Hant"
    });

    let sourceTranslateText = texts.join(' ');

    try {
        let response = await fetch(uriBase + "?" + params.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': subscriptionKey1,
                'Ocp-Apim-Subscription-Region': 'swedencentral'
            },
            body: JSON.stringify([{ Text: sourceTranslateText }])
        });

        let data = await response.json();
        let responseTextArea1 = document.getElementById('responseTextArea1');
        if (responseTextArea1) {
            responseTextArea1.value = JSON.stringify(data, null, 2);
        }
        let translateResult = document.getElementById('translateResult');
        if (translateResult) {
            translateResult.innerHTML = '';
            data[0].translations.forEach(function (translation) {
                translateResult.append(translation.text + "<br>");
            });
        }

        var hiddenElements = Array.from(document.getElementsByClassName('hidden'));
        for (var i = 0; i < hiddenElements.length; i++) {
            hiddenElements[i].classList.remove('hidden');
            hiddenElements[i].style.display = 'block';
        }
    } catch (error) {
        console.error(error);
        console.log(error);
    }
};