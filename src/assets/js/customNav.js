'use strict';
export const myNav = () => {
   document.addEventListener('DOMContentLoaded', function () {
      const navEl = document.getElementById('theNav');
      navEl.insertAdjacentHTML(
         'beforebegin',
         '<nav class="navbar navbar-expand-lg">' +
            '<div class="container-fluid d-flex justify-content-center">' +
            // '<a class="navbar-brand" href="./index.html">' +
            // '<img class="logo" src="../src/assets/media/SRDlogoWhite.png" loading="lazy" alt="Sarasota Remodeling and Design Logo" />' +
            '<h1 class="h1 align-middle">' +
            'Sarasota Remodeling & Design' +
            '</h1>' +
            // '</a>' +
            '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation" >' +
            '<span class="navbar-toggler-icon"></span>' +
            '</button>' +
            '<button type="button" class="btn btn-myBlack ms-5 p-2" data-bs-toggle="modal" data-bs-target="#modal" >' +
            'GET A FREE QUOTE!' +
            '</button>' +
            '<div class="collapse navbar-collapse flex-row justify-content-end" id="navbarNavAltMarkup" >' +
            '<div class="navbar-nav">' +
            '<a class="nav-link" href="./services.html">' +
            'Services' +
            '</a>' +
            '<a class="nav-link" href="./gallery.html">' +
            'Gallery' +
            '</a>' +
            '<a class="nav-link" href="./contact.html">' +
            'Contact' +
            '</a>' +
            '<a class="nav-link" href="./blog.html">' +
            'Blog' +
            '</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</nav>'
      );
   });
};
