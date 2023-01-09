'use strict';
export const handleContactUs = () => {
   const formEl = document.querySelector('form');

   const submitMsg = async (e) => {
      e.preventDefault();
      const formData = Object.fromEntries(new FormData(e.target).entries());
      console.log(formData);
      const configObj = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            mode: 'no-cors',
         },
         body: JSON.stringify(formData),
      };

      // post
      //   try {
      //      const configObj = {
      //         method: 'POST',
      //         headers: {
      //            'Content-Type': 'application/json',
      //            Accept: 'application/json',
      //         },
      //         body: JSON.stringify(formData),
      //      };

      //      //  console.log(configObj);

      //      const response = await fetch(`${formEl.action}`, configObj);

      //      if (response.ok) {
      //         response.json().then((newMessage) => console.log(newMessage));
      //      } else {
      //         const { errors } = await response.json();
      //         throw new Error(
      //            `Problem with message: ${errors} ${response.status}: ${response.statusText}`
      //         );
      //      }
      //   } catch (error) {
      //      alert(error);
      //   }

      fetch(`${formEl.action}`, configObj)
         .then((r) => r.json())
         .then((data) => console.log(data));
   };

   formEl.addEventListener('submit', submitMsg);
};
