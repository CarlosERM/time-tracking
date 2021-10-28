export default function handleResize() {
  function changeElement(e) {
    console.log(e);
  }
  window.addEventListener("resize", changeElement);
}
