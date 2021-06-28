# Simple Cross Browser Suspender Extension

## Summary

A cross-browser extension to suspend inactive / unused tabs by "hiding" them behind a static, generic browser error page. Basically to suspend https://moshe-gr.com, it will be redirected to http://localhost:0/#https://www.moshe-gr.com (try it ;) ).

## Background

[The great suspender (RIP)](https://www.zdnet.com/article/google-kills-the-great-suspender-heres-what-you-should-do-next/).

- [In _much_ more detail](https://github.com/greatsuspender/thegreatsuspender/issues/1263).

### My own TL;DR

The great suspender was an extension that would automatically replace an open tab with a static, low memory page that would redirect back to the original on demand or after a set idle time. After a change of ownership, it was abused to contain malware, and therefore removed by Google.

Looking to avoid another extension by and unknown developer (who can always change), I opted to find a safer solution. I believe I have found it and want to share it in a way that can let others use / replicate it for their own benefit, at the level of knowledge and safety they require.

## Why is this solution safer

- No static page - cannot be abused without changing the logic in a noticeable way.
- Hash parameter - not sent to the server by the browser, by design.
- I decided to use localhost:0 as a "host" to keep things local, and on a port that shouldn't conflict with other services / local servers.
  - [See why here](https://www.lifewire.com/port-0-in-tcp-and-udp-818145).
- Simple code base - easy to fork, install manually, and if necessary - replicate.
- Advanced features will be "opt in" via a separate installation (on stores if / when I upload them) and branch - to always provide a stable, simple, base version.

## Resources

### Cross Browser APIs

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
