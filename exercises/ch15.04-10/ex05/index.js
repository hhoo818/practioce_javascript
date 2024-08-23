customElements.define(
  "inline-circle",
  class InlineCircle extends HTMLElement {
    connectedCallback() {
      this.style.display = "inline-block";
      this.style.borderRadius = "50%";
      this.style.border = `solid ${this.borderColor?.style || "black"} 1px`;
      this.style.transform = "translateY(10%)";

      if (!this.style.width) {
        this.style.width = "0.8em";
        this.style.height = "0.8em";
      }
    }

    static get observedAttributes() {
      // うまくborderlineが動かない
      return ["diameter", "color", "border-color"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case "diameter":
          this.style.width = newValue;
          this.style.height = newValue;
          break;
        case "color":
          this.style.backgroundColor = newValue;
          break;
        case "border-color":
          this.style.borderColor = newValue;
          break;
      }
    }

    get diameter() {
      return this.getAttribute("diameter");
    }
    set diameter(diameter) {
      this.setAttribute("diameter", diameter);
    }
    get color() {
      return this.getAttribute("color");
    }
    set color(color) {
      this.setAttribute("color", color);
    }
    get borderColor() {
      return this.getAttribute("border-color");
    }
    set borderColor(borderColor) {
      this.setAttribute("border-color", borderColor);
    }
  }
);
