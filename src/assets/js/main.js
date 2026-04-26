import { loadIncludes } from "./includes-loader.js";
import { initUi } from "./ui.js";
import { initServices } from "./services.js";
import { initContactModal } from "./contact-modal.js";

(async function () {
  "use strict";

  await loadIncludes();
  initUi();
  initServices();
  initContactModal();
})();
