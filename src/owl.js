require("browsernizr/test/audio");

require("browsernizr/test/css/positionsticky");

require("browsernizr/lib/prefixed");

require("browsernizr/lib/hasEvent");

require("browsernizr/test/touchevents");

window.Modernizr = require("browsernizr");

window.moment = require("moment");

window.Backbone = require("backbone");

if (window.__backboneAgent) {
    window.__backboneAgent.handleBackbone(window.Backbone)
};

Backbone.$ = jQuery;

window._ = require("underscore");

window.BackboneProjections = require("backbone.projections");

require("es5-shim");

window.Bacon = require("baconjs");

jQuery.fn.asEventStream = Bacon.$.asEventStream;

window.React = require("react/addons");

window.FlowdockText = require("flowdock-text");

require("backbone-query-parameters/backbone.queryparams-1.1-shim");

require("backbone-query-parameters");

require("./lib/flowdock/base");

require("./helpers/auto_link_helper");

require("./helpers/comment_helper");

require("./helpers/file_helper");

require("./helpers/helpers");

require("./helpers/indentation_helper");

require("./helpers/mail_helper");

require("./helpers/tag_helper");

require("./helpers/time_helper");

require("./helpers/title_helper");

require("./helpers/twitter_helper");

require("./helpers/url_helpers");

require("./lib/backbone/bacon");

require("./lib/backbone/collection_extensions");

require("./lib/backbone/model_extensions");

require("./lib/backbone/owl_sync");

require("./lib/bacon/throttled_stream");

require("./lib/domparser");

require("./lib/emojimoji");

require("./lib/flow_activities");

require("./lib/flowdock/audio_notifications");

require("./lib/flowdock/collection");

require("./lib/flowdock/desktop_notification_center");

require("./lib/flowdock/dropdown");

require("./lib/flowdock/emoji_control");

require("./lib/flowdock/trigger_method");

require("./lib/flowdock/theme_control");

require("./lib/flowdock/hierarchical_view");

require("./lib/flowdock/item_view");

require("./lib/flowdock/keboard_events");

require("./lib/key_event");

require("./lib/flowdock/keyboard_shortcuts");

require("./lib/flowdock/last_read_marker");

require("./lib/flowdock/message_desktop_notifications");

require("./lib/flowdock/message_received_notifier");

require("./lib/flowdock/resize");

require("./lib/flowdock/title_manager");

require("./lib/flowdock/typing_activity");

require("./lib/flowdock/unread_messages");

require("./lib/flowdock/user_activity");

require("./lib/flowdock/walkthrough");

require("./lib/jquery.autocomplete");

require("./lib/jquery.delayed-hover");

require("./lib/jquery.dragndrop");

require("./lib/jquery.emojie");

require("./lib/jquery.indent-paste");

require("./lib/jquery.reorderable");

require("./lib/jquery.scrollable-inview");

require("./lib/jquery.user-agent-class");

require("./lib/moment.locale");

require("./lib/notification_polyfill");

require("./lib/raf-polyfill");

require("./lib/source_detector");

require("./models/connection");

require("./models/emoji");

require("./models/filter");

require("./models/flow");

require("./models/flow_group");

require("./models/flow_preferences");

require("./models/integration");

require("./models/invitation");

require("./models/legacy_source");

require("./models/marker");

require("./models/message");

require("./models/notification_item");

require("./models/organization");

require("./models/preferences");

require("./models/private_conversation");

require("./models/source");

require("./models/tab_search");

require("./models/tag");

require("./models/thread");

require("./models/tutorial");

require("./models/tutorial_task");

require("./models/user");

require("./collections/applications");

require("./collections/combined");

require("./collections/emoji");

require("./collections/flows");

require("./collections/flow_groups");

require("./collections/users");

require("./collections/integrations");

require("./collections/invitations");

require("./collections/legacy_sources");

require("./collections/markers");

require("./collections/messages");

require("./collections/notification_items");

require("./collections/organization_flows");

require("./collections/organizations");

require("./collections/peaks");

require("./collections/private_conversations");

require("./collections/sources");

require("./collections/tags");

require("./collections/threads");

require("./cache/lru");

require("./cache/threads");

require("./views/shared/base");

require("./views/shared/attachment");

require("./views/shared/autocompleter");

require("./views/shared/avatar");

require("./views/shared/close");

require("./views/shared/dropdown_container");

require("./views/shared/everyone_warning");

require("./views/shared/expanding_input");

require("./views/shared/header");

require("./views/shared/list");

require("./views/shared/message");

require("./views/shared/message_autocompleter");

require("./views/shared/message_error");

require("./views/shared/message_input");

require("./views/shared/message_list");

require("./views/shared/message_loader");

require("./views/shared/more_messages");

Views.Shared.Overlay = require("./views/shared/overlay");

require("./views/shared/popup");

require("./views/shared/progress");

require("./views/shared/reversed_message_list");

require("./views/shared/tabbed_overlay");

require("./views/shared/tag_input");

require("./views/shared/textarea_autocompleter");

require("./views/shared/title");

require("./views/shared/title_action");

require("./views/shared/title_actions");

require("./views/shared/tokenist");

require("./views/shared/typing_users");

require("./views/shared/user_list");

require("./views/shared/index");

require("./views/errors/index");

require("./views/errors/error");

require("./views/errors/inline");

require("./views/errors/modal");

require("./views/errors/flow");

require("./views/errors/alert");

require("./views/errors/connection_closed");

require("./views/errors/external_action_failed");

require("./views/errors/external_authentication_required");

require("./views/errors/flow_not_found");

require("./views/errors/flow_subscribe_failed");

require("./views/errors/handshake_failed");

require("./views/errors/no_organizations");

require("./views/errors/private_not_found");

require("./views/errors/private_subscribe_failed");

require("./views/errors/update");

require("./views/errors/use_mac_app");

require("./views/chat");

require("./views/chat/message");

require("./views/chat/comment_message");

require("./views/chat/file_message");

require("./views/chat/input");

require("./views/chat/message_list");

require("./views/chat/private_toolbar");

require("./views/chat/user");

require("./views/chat/user_list");

require("./views/content");

require("./views/embed");

require("./views/embed/embeddable");

require("./views/flow");

require("./views/flow_manager");

require("./views/flow_view_model");

require("./views/inbox");

require("./views/inbox/comment_form");

require("./views/inbox/comment_list");

require("./views/inbox/fileuploader");

require("./views/inbox/full_text");

require("./views/inbox/header");

require("./views/inbox/item");

require("./views/inbox/item_action_list");

require("./views/inbox/message_list");

require("./views/inbox/search_autocompleter");

require("./views/inbox/single_view");

require("./views/inbox/single_view_error");

require("./views/inbox/single_view_message");

require("./views/inbox/thread");

require("./views/navigation");

require("./views/navigation/sidebar_dropdown_menu");

require("./views/navigation/flow_dropdown_menu");

require("./views/navigation/flow_list");

require("./views/navigation/navigation_desktop");

require("./views/navigation/navigation_mobile");

require("./views/navigation/notification");

require("./views/navigation/notification_center");

require("./views/navigation/notification_list");

require("./views/navigation/screenhero");

require("./views/navigation/sidebar_dropdown");

require("./views/navigation/tabs");

require("./views/navigation/tab");

require("./views/navigation/tabs_desktop");

require("./views/navigation/tabs_mobile");

require("./views/navigation/user_menu");

require("./views/new_flow");

require("./views/new_organization");

require("./views/overlays");

require("./views/overlays/keyboard_shortcuts");

require("./views/overlays/meme_commands");

require("./views/overlays/meme_templates");

require("./views/overlays/nick_conflict");

require("./views/overlays/promotion_banner");

require("./views/overlays/slash_commands");

require("./views/overlays/upload");

require("./views/private");

require("./views/thread");

require("./views/thread/action");

require("./views/thread/action_list");

require("./views/thread/actions");

require("./views/thread/message");

require("./views/thread/activity");

require("./views/thread/activity_list");

require("./views/thread/comment");

require("./views/thread/discussion");

require("./views/thread/comment_form");

require("./views/thread/file_message");

require("./views/thread/header");

require("./views/thread/title");

require("./views/toolbar");

require("./views/toolbar/desktop");

require("./views/toolbar/mobile");

require("./views/toolbar/search");

require("./views/toolbar/user_counter");

require("./views/users/invitation");

require("./views/users/invitations");

require("./views/users/user_card");

require("./presenters/activity");

require("./presenters/attachment");

require("./presenters/chat_message");

require("./presenters/helper");

require("./presenters/inbox_message");

require("./presenters/line_message");

require("./presenters/presenters");

require("./presenters/team_inbox/confluence");

require("./presenters/team_inbox/git");

require("./presenters/team_inbox/jira");

require("./presenters/team_inbox/kiln");

require("./presenters/team_inbox/mail");

require("./presenters/team_inbox/mercurial");

require("./presenters/team_inbox/perforce");

require("./presenters/team_inbox/subversion");

require("./presenters/team_inbox/twitter");

require("./presenters/chat/action_message");

require("./presenters/chat/file_message");

require("./presenters/chat/user_edit_message");

require("./presenters/index");

require("./router");

require("./app");
