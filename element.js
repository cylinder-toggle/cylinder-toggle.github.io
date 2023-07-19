customElements.define("cylinder-toggle", class extends HTMLElement {
    constructor() {
        super()
            .attachShadow({ mode: "open" })
            .innerHTML = `
            <style>
            :host {
                --hue: 223;
                --bg: hsl(var(--hue),10%,90%);
                --fg: hsl(var(--hue),10%,10%);
                --trans-dur: 0.4s;
                font-size: calc(40px + (60 - 40) * (100vw - 320px) / (2560 - 320));
            }
            :host,
            input {
                color: var(--fg);
                font: 1em Helvetica, sans-serif;
            }
            label,
            input,
            .sides,
            .side,
            .labels,
            .handle-label,
            .texture {
                display: block;
            }
            label,
            input {
                cursor: pointer;
                -webkit-tap-highlight-color: transparent;
            }
            label {
                margin: auto;
                position: relative;
                width: 3em;
                height: 3em;
                left: -.25em;
                top: -.1em;
            }
            input {
                background-color: hsl(var(--hue),10%,95%);
                border-radius: 0.25em;
                box-shadow:
                    0.125em 0.125em 0.125em hsl(0,0%,100%) inset,
                    -0.125em -0.125em 0.125em hsl(var(--hue),10%,85%) inset,
                    0.125em 0.125em 0.375em hsl(var(--hue),10%,70%);
                outline: transparent;
                position: relative;
                width: 100%;
                height: 100%;
                transition:
                    background-color var(--trans-dur),
                    box-shadow var(--trans-dur);
                -webkit-appearance: none;
                appearance: none;
            }
            input:before {
                border-radius: inherit;
                box-shadow: 0 0 0 max(0.125em,1px) hsla(var(--hue),90%,50%,0);
                content: "";
                display: block;
                position: absolute;
                inset: 0;
                transition: box-shadow 0.15s linear;
            }
            input:focus-visible:before {
                box-shadow: 0 0 0 max(0.125em,1px) hsla(var(--hue),90%,50%,1);
            }
            .handle,
            .sides,
            .side,
            .labels,
            .handle-label {
                position: absolute;
            }
            .handle,
            .handle-label {
                transition: transform var(--trans-dur) cubic-bezier(0.65,0,0.36,1.6);
            }
            .handle,
            .sides,
            .texture {
                border-radius: 0.125em;
            }
            .handle {
                box-shadow: 0.25em 0.25em 0.25em hsla(var(--hue),10%,10%,0.4);
                top: 10%;
                left: 10%;
                width: 40%;
                height: 80%;
            }
            .sides,
            .labels,
            .texture {
                width: 100%;
                height: 100%;
            }
            .sides,
            .side {
                background-color: hsl(var(--hue),10%,85%);
                transition:
                    background-color var(--trans-dur),
                    transform var(--trans-dur) cubic-bezier(0.65,0,0.36,1.6);
            }
            .sides {
                --side-on: hsl(123,90%,40%);
                background-image: linear-gradient(90deg,transparent 50%,var(--side-on) 50%);
                overflow: hidden;
            }
            .side {
                background-image: linear-gradient(90deg,var(--side-on) 50%,transparent 50%);
                transform: translateX(-50%);
                width: 200%;
                height: 100%;
            }
            .labels {
                transform-style: preserve-3d;
                -webkit-user-select: none;
                -moz-user-select: none;
                user-select: none;
            }
            .handle-label {
                backface-visibility: hidden;
                font-size: 0.6em;
                text-shadow: 0 0 0.125em hsla(var(--hue),10%,10%,0.3);
                line-height: 1;
                top: 50%;
                left: 50%;
                text-align: center;
                text-transform: uppercase;
                transform: translate(-50%,-50%) rotateZ(90deg) rotateX(0) translateZ(0.55rem);
            }
            .handle-label + .handle-label {
                color: hsl(0,0%,100%);
                text-shadow: 0 0 0.125em hsla(0,0%,100%,0.3);
                transform: translate(-50%,-50%) rotateZ(90deg) rotateX(180deg) translateZ(0.55rem);
            }
            .texture {
                background-image:
                    linear-gradient(
                        90deg,
                        hsla(0,0%,100%,0),
                        hsla(0,0%,100%,0.3) 20%,
                        hsla(0,0%,100%,0) 40%,
                        hsla(0,0%,0%,0) 50%,
                        hsla(0,0%,0%,0.4)
                    );
                box-shadow:
                    0 0.0625em 0.0625em hsla(0,0%,100%,0.3) inset,
                    0 -0.0625em 0.0625em hsla(0,0%,0%,0.3) inset;
                transform: translateZ(0);
            }
            input:checked ~ .handle {
                transform: translateX(100%);
            }
            input:checked ~ .handle .side {
                transform: translateX(0);
            }
            input:checked ~ .handle .handle-label {
                transform: translate(-50%,-50%) rotateZ(90deg) rotateX(180deg) translateZ(0.55rem);
            }
            input:checked ~ .handle .handle-label + .handle-label {
                transform: translate(-50%,-50%) rotateZ(90deg) rotateX(360deg) translateZ(0.55rem);
            }
            .label {
                overflow: hidden;
                position: absolute;
                width: 1px;
                height: 1px;
            }
            </style>
            <style>
            /* Dark theme */
            @media (prefers-color-scheme: dark) {
                :host {
                    --bg: hsl(var(--hue),10%,30%);
                    --fg: hsl(var(--hue),10%,90%);
                }
                .sides,
                .side {
                    background-color: hsl(var(--hue),10%,45%);
                }
                .handle-label {
                    text-shadow: 0 0 0.125em hsla(var(--hue),10%,90%,0.3);
                }
                input {
                    background-color: hsl(var(--hue),10%,35%);
                    box-shadow:
                        0.125em 0.125em 0.125em hsl(var(--hue),10%,50%) inset,
                        -0.125em -0.125em 0.125em hsl(var(--hue),10%,25%) inset,
                        0.125em 0.125em 0.375em hsl(var(--hue),10%,20%);
                }
            }            
            </style>`;
    }
    connectedCallback() {
        this.render();
        this.checked = this.hasAttribute("checked");
    }
    render() {
        this.shadowRoot.append(
            Object.assign(
                document.createElement("label"), {
                innerHTML: `<input type="checkbox" role="switch">
                    <span class="handle">
                        <span class="sides">
                            <span class="side"/>
                        </span>
                        <span class="labels">
                            <span class="handle-label" aria-hidden="true">Uit</span>
                            <span class="handle-label" aria-hidden="true">Aan</span>
                        </span>
                        <span class="texture"/>
                    </span>
                    <span class="label">Power</span>`
            }));
    }
    get input(){
        return this.shadowRoot.querySelector("input");
    }
    get checked() {
        return this.hasAttribute("checked");
    }
    set checked(value) {
            this.input.toggleAttribute("checked", value);
    }
})
