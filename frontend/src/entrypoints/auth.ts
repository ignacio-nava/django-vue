import { injectScript } from "../utils/manager";
import Logout from "@/views/accounts/components/Logout.vue";

const element = document.querySelector<HTMLElement>("#logout");
if (element) {
    injectScript(null, element, Logout)
}