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
let boundingBoxes = [];
let translatedTexts = [];

async function processImage() {

    // 清空 boundingBoxes 陣列
    boundingBoxes = [];

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
                        // boundingBoxes.push(z.boundingBox);

                        // 創建一個新的物件並將其推送到 boundingBoxes 陣列
                        boundingBoxes.push({
                            boundingBox: z.boundingBox,
                            text: z.text
                        });
                    }
                }
            }
        }
    } catch (error) {
        console.error(error);
        console.log(error);
    }
    drawImageOnCanvas(sourceImageUrl);

};

//增加本地上傳圖片功能
async function processImageFile(imageObject) {

    // 清空 boundingBoxes 陣列
    boundingBoxes = [];

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
                        // boundingBoxes.push(z.boundingBox);

                        // 創建一個新的物件並將其推送到 boundingBoxes 陣列
                        boundingBoxes.push({
                            boundingBox: z.boundingBox,
                            text: z.text
                        });
                    }
                }
            }
        }
    } catch (error) {
        console.error(error);
        console.log(error);
    }
    drawImageOnCanvas(sourceImageUrl);

};


async function processTranslate() {
    let uriBase = "https://api.cognitive.microsofttranslator.com/translate";
    let params = new URLSearchParams({
        "api-version": "3.0",
        "to": "zh-Hant"
    });

    // let sourceTranslateText = texts.join(' ');

    // 從每個 boundingBox 物件中取出 text 屬性並將它們連接成一個字串
    let sourceTranslateText = boundingBoxes.map(boundingBox => boundingBox.text).join(' ');

    let sourceTranslateText1 = boundingBoxes
    console.log(sourceTranslateText1)

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
            data[0].translations.forEach(function (translation, i) {
                translateResult.append(translation.text + "<br>");
                translatedTexts.push({
                    text: translation.text,
                    boundingBoxes
                });
            });
        }
        a = translatedTexts
        console.log(a)

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


function drawImageOnCanvas(imageUrl) {
    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d');

    // 清除 canvas 的內容
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let img = new Image();
    img.onload = function () {
        // 將 canvas 的大小設置為與圖片的大小相同
        canvas.width = img.width;
        canvas.height = img.height;

        // 繪製圖片
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // 繪製每一個翻譯的文字和邊框
        for (let boundingBox of boundingBoxes) {
            // 分解邊界框的座標
            let coordinates = boundingBox.boundingBox.split(',').map(Number);

            // 設置文字的樣式
            ctx.fillStyle = 'blue'; // 设置文字颜色
            ctx.font = '20px Arial'; // 设置字体和大小

            var x = coordinates[0];
            var y = coordinates[1];
            var width = coordinates[2] ;
            var height = coordinates[3] ;

            // 繪製文字
            ctx.fillText(boundingBox.text, x, y);

            // 設置邊框的樣式
            ctx.strokeStyle = 'red'; // 设置边框颜色
            ctx.lineWidth = 2; // 设置边框宽度

            // 繪製邊框
            // ctx.strokeRect(x, y, width, height);
             //清除边框
            ctx.clearRect(x, y, width, height);
        }
    }
    img.src = imageUrl;
}
