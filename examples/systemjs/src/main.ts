import {bootstrap} from "@angular/platform-browser-dynamic";
import {HTTP_PROVIDERS, Http} from "@angular/http";
import {App} from "./app";
import {APP_ROUTER_PROVIDERS} from "./app.routes";

document.addEventListener('DOMContentLoaded', function main(): void {
    bootstrap(App, [
        APP_ROUTER_PROVIDERS,
        HTTP_PROVIDERS,
        Http
    ])
        .catch(err => console.error(err));
});