import ltiResourceLink from "./ltiResourceLink";
import user from "./user";

const session = {
  ltiLaunchBody: {
    oauth_version: "1.0",
    oauth_nonce: "1234567890",
    oauth_timestamp: "1234567890",
    oauth_consumer_key: "key",
    oauth_signature_method: "HMAC-SHA1",
    oauth_signature: "1234567890abcdeABCDE",
    lti_message_type: "basic-lti-launch-request",
    lti_version: "LTI-1p0",
    user_id: "1234567890abcdefg",
    roles: "urn:lti:role:ims/lis/Instructor",
    resource_link_id: ltiResourceLink.id,
    resource_link_title: ltiResourceLink.title,
    context_id: ltiResourceLink.contextId,
    context_title: ltiResourceLink.contextTitle,
    context_label: ltiResourceLink.contextLabel,
    lis_person_name_full: "山田 太郎",
  },
  ltiResourceLink,
  user,
};

export default session;
