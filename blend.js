class TemplateElement extends HTMLElement {
    connectedCallback() {
        let name = this.getAttribute('name')
        let template = this.innerHTML
        
        class _TemplateElement extends HTMLElement {
            connectedCallback() {
                func = new Function(template, "ctx")
                context = {
                    innerHTML: this.innerHTML, 
                    attributes: this.attributes
                }
                this.innerHTML = func(context)
            }
        }
        
        this.innerHTML = ""

        customElements.define(name, _TemplateElement)
    }
}

class IncludeElement extends HTMLElement {
    connectedCallback() {
        fetch(this.getAttribute('src')).then((resp) => {
            resp.text().then((text) => {
                this.innerHTML = text
            })
        })
    }
}

customElements.define('x-template', TemplateElement);
customElements.define('x-include', IncludeElement);