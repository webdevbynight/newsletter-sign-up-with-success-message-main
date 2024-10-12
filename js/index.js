const signUpSubscription = document.querySelector(".sign-up.subscription");
const form = signUpSubscription.querySelector("form");
if (signUpSubscription && form) {
    form.addEventListener("submit", e => {
        e.preventDefault();

        // Validate the form
        const formData = new FormData(e.target);
        const emailPattern = /^[-_.0-9a-z]+@[-0-9a-z]+(\.[a-z]{2,4})?\.[a-z]{2,6}$/i;
        const email = formData.get("e-mail");

        if (email !== null) {
            if (!email.match(emailPattern)) {
                const field = form.querySelector(`input[type="email"]`);
                if (field) {
                    const invalidationMessageContainerId = "e-mail-invalidation-message";
                    if (!document.getElementById(invalidationMessageContainerId)) {
                        const invalidationMessage = "Valid e-mail required";
                        const invalidationMessageContainer = document.createElement("span");
                        invalidationMessageContainer.id = invalidationMessageContainerId;
                        invalidationMessageContainer.className = "invalidation-message";
                        invalidationMessageContainer.setAttribute("aria-live", "assertive");
                        invalidationMessageContainer.innerText = invalidationMessage;
                        field.setAttribute("required", ""); // Set this boolean attribute to allow the use of CSS rules targeted by the `:invalid` selector
                        field.setAttribute("aria-describedby", invalidationMessageContainer.id);
                        field.setAttribute("aria-invalid", "true");
                        field.parentNode.insertBefore(invalidationMessageContainer, field);
                    }
                }
            } else {
                /**
                 * Here, you should see the use of the Fetch API to send the valid e-mail address to the server and treat the server response.
                 * But, this challenge does not include such a purpose.
                 * In other words, many developers would just write ”TODO” as a comment.
                 */

                // Display confirmation message
                const signUpConfirmation = document.createElement("section");
                signUpConfirmation.classList.add("sign-up", "confirmation");
                const signUpConfirmationTitle = document.createElement("h1");
                signUpConfirmationTitle.className = "title";
                signUpConfirmationTitle.innerText = "Thanks for subscribing!";
                const signUpConfirmationContent = document.createElement("p");
                signUpConfirmationContent.innerHTML = `A confirmation email has been sent to <strong>${email}</strong>. Please open it and click the button inside to confirm your subscription.`;
                const signUpConfirmationButtonContainer = document.createElement("p");
                const signUpConfirmationButton = document.createElement("a");
                signUpConfirmationButton.href = "./";
                signUpConfirmationButton.innerText = "Dismiss message";
                signUpConfirmationButtonContainer.appendChild(signUpConfirmationButton);
                signUpConfirmation.appendChild(signUpConfirmationTitle);
                signUpConfirmation.appendChild(signUpConfirmationContent);
                signUpConfirmation.appendChild(signUpConfirmationButtonContainer);
                const signUpParentElement = signUpSubscription.parentNode;
                if (signUpParentElement) {
                    signUpParentElement.replaceChild(signUpConfirmation, signUpSubscription);
                }
            }
        }
    });
}
