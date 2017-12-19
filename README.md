# NativeScript Developers Day EU 2017

## app/shared/config.ts

This file should contain the API endpoint (**apiUrl**) and the Basic Authentication key (**apiAuthorization**).
For obvious reasons these are not provided in this project.
This will result in an error:
**Unable to retrieve conference data from the server. Maybe an internet connection was unavailable. You might not have the latest information.**
However, the app will still work. It will use the provided **default.json** file in app/data.
