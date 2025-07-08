const dataInput = document.querySelector("#data");
const mainColor = document.querySelector("#color");
const backgroundColor = document.querySelector("#bg-color");
const mainColorValue = document.querySelector("#color-value");
const backgroundColorValue = document.querySelector("#bg-color-value");
const sizeSlider = document.querySelector("#size");
const sizeValue = document.querySelector("#size-value");
const marginSlider = document.querySelector("#margin");
const marginValue = document.querySelector("#margin-value");
const imageFormat = document.querySelector('input[name="format"]:checked');
const submitButton = document.querySelector("#cta");
const settingsContainer = document.querySelector("#qr-code-settings");
const resultsContainer = document.querySelector("#qr-code-result");
const qrCodeImage = document.querySelector("#qr-code-image");

// Colors

const updateColor = e => {
  const value = e.target.value;
  mainColorValue.innerText = value;
};
const updateBackgroundColor = e => {
  const value = e.target.value;
  backgroundColorValue.innerText = value;
};

const addColorPickerEventListeners = () => {
  mainColor.addEventListener("change", updateColor);
  backgroundColor.addEventListener("change", updateBackgroundColor);
};

// Size

const updateSize = e => {
  const value = e.target.value;
  sizeValue.innerText = `${value} x ${value}`;
};

const updateMargin = e => {
  const value = e.target.value;
  marginValue.innerText = `${value}px`;
};

const addSliderEventListeners = () => {
  sizeSlider.addEventListener("change", updateSize);
  marginSlider.addEventListener("change", updateMargin);
};

const prepareParameters = params => {
  return {
    data: params.data,
    color: params.color.replace("#", ""),
    bgcolor: params.bgColor.replace("#", ""),
    size: `${params.size}x${params.size}`,
    qzone: `${params.qZone}px`,
    format: params.format,
  };
};

//Display QR Code

const displayQrCode = imgUrl => {
    settingsContainer.classList.add('flipped');
    resultsContainer.classList.add('flipped');

    qrCodeImage.setAttribute('src', imgUrl);
};

const getQrCode = parameters => {
    const baseUrl = 'https://api.qrserver.com/v1/create-qr-code/';
    const urlParams = new URLSearchParams(parameters).toString();

    const fullUrl = `${baseUrl}?${urlParams}`;

    fetch(fullUrl).then(response => {
        if (response.status === 200) {
            displayQrCode(fullUrl);
        }
    });
};

// CTA Functionality

const showInputError = () => {
  dataInput.classList.add("error");
};

const dataInputEventListener = () => {
  dataInput.addEventListener("change", e => {
    if (e.target.value !== "") {
      dataInput.classList.remove("error");
      submitButton.removeAttribute("disabled");
    } else {
      dataInput.classList.add("error");
      submitButton.setAttribute("disabled", true);
    }
  });
};

const onSubmit = () => {
  console.log("clicked");
  const data = dataInput.value;
  if (!data.length) {
    return showInputError();
  }

  const color = mainColor.value;
  const bgColor = backgroundColor.value;
  const size = sizeSlider.value;
  const qZone = marginSlider.value;
  const format = imageFormat.value;

  const parameters = prepareParameters({ data, color, bgColor, size, qZone, format });
  getQrCode(parameters);
};

const addSubmitEventListener = e => {
  submitButton.addEventListener("click", onSubmit);
};

// Reset input fields on refresh

const resetFormOnRefresh = () => {
  dataInput.value = "";
  dataInput.classList.remove("error");
  mainColor.value = "#000000";
  backgroundColor.value = "#ffffff";
  mainColorValue.innerText = "#000000";
  backgroundColorValue.innerText = "#ffffff";
  sizeSlider.value = "200";
  marginSlider.value = "0";
  sizeValue.innerText = "200 x 200";
  document.querySelector('input[name="format"][value="png"]').checked = true;
  submitButton.setAttribute("disabled", true);
};

// Edit Button Functionality

const editButton = document.querySelector('#edit');

const onEdit = () => {
    settingsContainer.classList.remove('flipped');
    resultsContainer.classList.remove('flipped');
};

const addEditEventListener = () => {
    editButton.addEventListener('click', onEdit);
};



// Calling Functions

dataInputEventListener();
addColorPickerEventListeners();
addSliderEventListeners();
addSubmitEventListener();
addEditEventListener();
window.addEventListener("DOMContentLoaded", resetFormOnRefresh);
