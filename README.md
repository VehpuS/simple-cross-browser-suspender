# Simple Cross Browser Suspender Extension

## Summary

A cross-browser extension to suspend inactive / unused tabs by "hiding" them behind a static, generic browser error page. Basically to suspend https://moshe-gr.com, it will be redirected to http://localhost:0/#https://www.moshe-gr.com (try it ;) ).

## Manual Installation (running from source)

### Chrome

1. Clone the repo from Github.
2. Go to the [Manage Extensions page](chrome://extensions/).
   <img src="https://github.com/VehpuS/simple-cross-browser-suspender/raw/master/docs/chrome_manage_extensions.png" />

3. Toggle on Developer Mode (top right corner).
   <img src="https://github.com/VehpuS/simple-cross-browser-suspender/raw/master/docs/chrome_dev_mode_toggle.png" />

4. Load the unpacked extension from the manifest-v3 folder (manifest-v2 will work too for now).
   <img src="https://github.com/VehpuS/simple-cross-browser-suspender/raw/master/docs/chrome_load_unpacked_button.png" />

### Edge

1. Clone the repo from Github.
2. Go to the [Manage Extensions page](edge://extensions/).
   <img src="https://github.com/VehpuS/simple-cross-browser-suspender/raw/master/docs/edge_manage_extensions.png" />

3. Toggle on Developer Mode (top right corner).
   <img src="https://github.com/VehpuS/simple-cross-browser-suspender/raw/master/docs/edge_dev_mode_toggle.png" />

4. Load the unpacked extension from the manifest-v3 folder (manifest-v2 will work too for now).
   <img src="https://github.com/VehpuS/simple-cross-browser-suspender/raw/master/docs/edge_load_unpacked_button.png" />

### Mozilla

1. Clone the repo from Github.
2. Go to the [Mozilla debugging page](about:debugging#/runtime/this-firefox).

   1. If the URL doesn't work:

      1. Got to the [Add-ons Manager page](about:addons).
         <img src="https://github.com/VehpuS/simple-cross-browser-suspender/raw/master/docs/mozilla_add_ons_and_themes.png" />

      2. Select the gear icon next to "Manage Your Extensions" and select "Debug Add-ons".
         <img src="https://github.com/VehpuS/simple-cross-browser-suspender/raw/master/docs/mozilla_tools_for_extensions.png" />
         <img src="https://github.com/VehpuS/simple-cross-browser-suspender/raw/master/docs/mozilla_debug_add_ons.png" />

3. Press "Load Temporary Add-on..." and select the manifest-v2 folder (Mozilla doesn't support the manifest-v2 folder).
   <img src="https://github.com/VehpuS/simple-cross-browser-suspender/raw/master/docs/mozilla_load_temp_add_on.png" />

## Background

[The great suspender (RIP)](https://www.zdnet.com/article/google-kills-the-great-suspender-heres-what-you-should-do-next/).

- [In _much_ more detail](https://github.com/greatsuspender/thegreatsuspender/issues/1263).

### My own TL;DR

The great suspender was an extension that would automatically replace an open tab with a static, low memory page that would redirect back to the original on demand or after a set idle time. After a change of ownership, it was abused to contain malware, and therefore removed by Google.

Looking to avoid another extension by and unknown developer (who can always change), I opted to find a safer solution. I believe I have found it and want to share it in a way that can let others use / replicate it for their own benefit, at the level of knowledge and safety they require.

## Why is this solution safer

- No static page - cannot be abused without changing the logic in a noticeable way.
- Hash parameter - [not sent to a server by the browser, by design](https://stackoverflow.com/questions/15238391/hash-params-vs-url-params-when-to-use-which).
- I decided to use localhost:0 as a "host" to keep things local, and on a port that shouldn't conflict with other services / local servers.
  - [See why here](https://www.lifewire.com/port-0-in-tcp-and-udp-818145).
- Simple code base - easy to fork, install manually, and if necessary - replicate.

  - The core of the script boils down to:

    ```javascript
    const suspendPrefix = "https://localhost:0/#";
    const toggleSuspendUrl = (pageUrl) =>
      pageUrl.startsWith(suspendPrefix)
        ? pageUrl.replace(suspendPrefix, "")
        : `${suspendPrefix}${pageUrl}`;
    if (browser) {
      browser.browserAction.onClicked.addListener((tab) => {
        browser.tabs.update(tab.id, { url: toggleSuspendUrl(tab.url) });
      });
    }
    ```

- The API I'm using doesn't require running Javascript code on the web page in the tab - just to get a page's URL. This makes the abuse potential minimal, and is reflected in the extensions limited permissions.
- Advanced features, if/when added, will be "opt in" via a separate installation (on stores if / when I upload them) and branch (or possibly repository) - to always provide a stable, simple, and secure base version.

## Known issues

- Cannot unsuspend internal pages in Mozilla, due to [the following issue](https://bugzilla.mozilla.org/show_bug.cgi?id=1269456).

## Resources for Potentially Relevant APIs

- [Awesome resources](https://github.com/fregante/Awesome-WebExtensions).

### Cross Browser APIs

- [Firefox general notes](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Build_a_cross_browser_extension).

#### Base capability - read URL + redirect manually

- [Tabs API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs).
  - Move tab to a new URL - [tabs.update()](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/update).
  - discarded tabs - as documented [here](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/Tab).
- [Windows API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/windows).
  - Get window URL - [windows.getCurrent()](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/windows/getCurrent).
    - [Example extension](https://github.com/mdn/webextensions-examples/tree/master/window-manipulator).
- Call via a [page action](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/pageAction).

#### Add on features (will be a separate branch + extension)

- Schedule code to run at a specific time in the future using the [alarm API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/alarms).
- Idle recognition via the [idle API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/idle).

#### Incompatabilies

- [By Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Chrome_incompatibilities).

#### Examples

- [Firefox Examples](https://github.com/mdn/webextensions-examples).
- [Porting from Google Chrome](https://extensionworkshop.com/documentation/develop/porting-a-google-chrome-extension/).
- [Tutorial](https://dev.to/guillermocoding/building-your-first-cross-browser-extension-1mf3).

#### Mobile

- [Firefox Docs](https://extensionworkshop.com/documentation/develop/differences-between-desktop-and-android-extensions/).

### Handling error pages in browsers (current solution works without this)

Chrome error pages take over the `window.location.href` attribute https://stackoverflow.com/questions/29989031/getting-the-current-domain-name-in-chrome-when-the-page-fails-to-load

I used a different selector when trying to run code from the page (not the current solution - recorded here in case it is needed):

```javascript
document.querySelector(`[jscontent="failedUrl"]`)?.innerText;
```
