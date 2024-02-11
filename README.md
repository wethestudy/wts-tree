
# Tree of Knowledge

This app is used to display the links among WeTheStudy CMS items using a graphical view.


## Features

- Interactive tree
- Options to manipulate tree (filter, show connections, and color code)
- Search option
- Responsive views (desktop and mobile portrait only)

## Tech Stack

**Client:** React, d3.js

**Server:** Node, Express


## Roadmap

Version 1.06 (Now)
- Onboarding
- Track system

To implement:
- RADIAL TREE: Tree only view; click on node to reveal card
- CAMERA: When filtering records and there is selected node, check if node is present and zoom to that node
- NAVIGATION: Center on selected node button
- SEARCH: Display only 30 items; any excess item - use page numbering
- UI: Light/dark mode toggle
- CODE: Automatic generation of colors for category and topic to accommodate future increase
- UX: "How-to" screens
- POPUP VIEW: Resize

Version 2.0
- MULTIPLE TREE VIEWS: Construct new graphical views (linear, 3D)
- PERFORMANCE: Load only nodes in view (do not load everything)
- UI: Member personalization
- CODE: Data processing: preset and API fetching to WeTheStudy CMS database
- CODE: New state management (rely on React, less dependence on d3)
- CODE: Renaming of classNames and variables

## Contributing

For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Feedback

If you have any feedback, please reach out to us at wethestudy.wts@gmail.com


## Support

For support, email wethestudy.wts@gmail.com


## Authors
- [@wethestudy](https://github.com/wethestudy), Edgar Christian Dirige

