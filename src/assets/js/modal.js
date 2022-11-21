'use strict';

export const myModal = () => {
   const modalEl = document.getElementById('theModal');

   modalEl.insertAdjacentHTML(
      'afterbegin',
      '<div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">' +
         '<div class="modal-dialog">' +
         '<div class="modal-content">' +
         '<div class="modal-header">' +
         '<h1 class="modal-title fs-5" id="modalLabel">Call Now for a FREE QUOTE!</h1>' +
         '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>' +
         '<div class="modal-body">Dial (941)313-0263</div>' +
         '<div class="modal-footer">' +
         '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button></div></div></div></div>'
   );
};
