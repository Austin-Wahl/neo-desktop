# Services

Services is the name for all processes running within the Node Main Process which are exposed to the Neo frontend through IPC. All query/adapter/management/etc.. related functionality is handled by a service provider. Basically, fancy words for keeping things organized.

## Types of services

Neo handles things by grouping them into categories. These categories contain functions related to some end-user function. Example: Creating a project. A Neo service within the Project category handles this.

Below, you will find a list of categories and the general theme of what it is that it's responsible for.

- Project
  - Handles Project related functions
- Connection
  - Handles Connection related functions
- Adapter
  - Handles Adapter related functions
- Account
  - Handles the user account processes
- DataSync
  - Syncs local content with Neo Cloud

For documentation reguarding Adapters, please refer to the main README.
