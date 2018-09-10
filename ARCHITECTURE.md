# Flowdock UI Architecture

## Router

- `"": "activateFirst"`
- `"new-tab": "showNewTab"`
- `"private(/:id)": "routePrivate"`
- `":org/:name/welcome": "welcome"`
- `":org/:name/welcome/:type": "welcome"`
- `"preferences/:initialTab": "viewPreferences"`
- `preferences: "viewPreferences"`
- `"create-flow(/:organizationId)": "viewCreateFlow"`
- `":org/:name": "routeFlow"`
- `":org/multi/:name": "routeMultiFlow"`
- `":org/:name/users": "viewUsers"`
- `":org/:name/messages/:id": "viewSingleMessage"`
- `":org/:name/threads/:id": "viewThread"`
- `":org/:name/-invalid": "routeInvalid"`
- `"create-organization": "viewCreateOrganization"`
- `"new-1-to-1": "viewNewPrivateDialog"`

## Models

## Collections

## View Tree

- `App`
    - `FlowManager`
        - `Navigation` (Desktop|Mobile)
            - `Navigation.UserMenu`
            - `Navigation.Tabs` (Desktop|Mobile)
                - `Navigation.FlowList`
                    - `Navigation.Tab`
                        - `Navigation.SidebarDropdown`
            - `Navigation.NotificationCenter`
                - `Navigation.NotificationList`
                    - `Shared.MessageLoader`
                    - `Navigation.Notification`
        - `ViewFlowModel`
        - `Flow`
            - `Inbox`
                - `Inbox.MessageList`
                    - `Inbox.Item`
            - `Chat`
                - `Chat.Input`
                - `Shared.TypingUsers`
                - `Chat.MessageList`
                    - `Chat.Message`
            - `Toolbar` (Desktop|Mobile)
                - `Toolbar.Search`
                    - `Inbox.SearchAutocompleter`
                    - `Inbox.FullText`
                - `Toolbar.UserCounter`
            - `Thread`
                - `Thread.Header`
                    - `Thread.Title`
                    - `Thread.Actions`
                - `Thread.CommentForm`
                - `Shared.TypingUsers`
                - `Thread.ActivityList`
                    - `Thread.Message`
                        - `Shared.Attachment`
                        - `Thread.Activity`
                        - `Thread.FileMessage`
                            - `Shared.Attachment`
                        - `Thread.Discussion`
                        - `Thread.Comment`
                            - `Embed`
                - `Shared.MoreMessages`
            - `Chat.UserList`
        - `Private`
            - `Chat`
            - `Chat.PrivateToolbar`
                - `Chat.User`
