//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
  // Add JavaScript here
})


// Import the MoJ sortable table library
import MOJFrontend from '@ministryofjustice/frontend';


document.addEventListener('DOMContentLoaded', function () {
  // Initialize MoJ sortable tables
  const sortableTable = document.querySelector('[data-module="moj-sortable-table"]');
  if (sortableTable) {
    new MOJFrontend.SortableTable(sortableTable);
  }
});