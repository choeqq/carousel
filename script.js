document.addEventListener("click", (e) => {
  let handle;
  if (e.target.matches(".handle")) {
    handle = e.target;
  } else {
    handle = e.target.closest(".handle");
  }
  if (handle != null) onHandleClick(handle);
});

document.querySelectorAll(".progress-bar").forEach(calculateProgressBar);

function calculateProgressBar(progressBar) {
  progressBar.innerHTML = "";
  const slider = progressBar.closest(".row").querySelector(".slider");
  const itemCount = slider.children.length;
  const sliderIndex = parseInt(
    getComputedStyle(slider).getPropertyValue("--slider-index")
  );
  const itemPerScreen = parseInt(
    getComputedStyle(slider).getPropertyValue("--items-per-screen")
  );
  const progressBarItemCount = Math.ceil(itemCount / itemPerScreen);
  for (let i = 0; i < progressBarItemCount; i++) {
    const barItem = document.createElement("div");
    barItem.classList.add("progress-item");
    if (i === sliderIndex) {
      barItem.classList.add("active");
    }
    progressBar.append(barItem);
  }
}

function onHandleClick(handle) {
  const progressBar = handle.closest(".row").querySelector(".progress-bar");
  const slider = handle.closest(".container").querySelector(".slider");
  const sliderIndex = parseInt(
    getComputedStyle(slider).getPropertyValue("--slider-index")
  );
  if (handle.classList.contains("left-handle")) {
    slider.style.setProperty("--slider-index", sliderIndex - 1);
    progressBar.children[sliderIndex].classList.remove("active");
    progressBar.children[sliderIndex - 1].classList.add("active");
  }
  if (handle.classList.contains("right-handle")) {
    slider.style.setProperty("--slider-index", sliderIndex + 1);
  }
}
