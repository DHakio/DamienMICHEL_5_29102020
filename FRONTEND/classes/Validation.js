class Validation {
    REGEX_ALPHA = /^[a-zA-Z\- ']+$/;
    REGEX_ALPHA_NUMERIC = /^[a-zA-Z\- 1-9']+$/;
    REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    ALPHA = ["firstName", "lastName", "city"];
    ALPHA_NUMERIC = ["address"];
    EMAIL = ["email"];

    input(name, content) { // Returns true if valid
        if(this.ALPHA.includes(name)) { // Test ALPHA inputs
            return this.REGEX_ALPHA.test(content);
        }
        else if(this.ALPHA_NUMERIC.includes(name)) { // Test ALPHA_NUMERIC inputs
            return this.REGEX_ALPHA_NUMERIC.test(content)
        }
        else if(this.EMAIL.includes(name)) { // Test EMAIL inputs
            return this.REGEX_EMAIL.test(content)
        }
        else {
            return false;
        }
    }
}