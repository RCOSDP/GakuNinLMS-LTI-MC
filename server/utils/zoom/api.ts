import got from "got";
import type { Method } from "got";

import {
  ZOOM_ACCOUNT_ID,
  ZOOM_CLIENT_ID,
  ZOOM_CLIENT_SECRET,
} from "$server/utils/env";

interface ZoomQuery {
  [key: string]: string | number | boolean;
}

// zoom apiのレスポンスデータ全般を扱う型
// apiによって内容は違うが、文字列のキー名と任意の型の値という形式は共通しており
// これらの形式をtypescriptの警告やエラーを回避しつつ利用できるようにするため
// any型を許容する。具体的な利用例は以下の通り
// value = response[keyname];
// next_page_token = response.next_page_token;
interface ZoomResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/**
 * List users
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/#operation/users
 */
export type ZoomUsersResponse = {
  next_page_token: string;
  page_count: number;
  page_number: number;
  page_size: number;
  total_records: number;
  users: Array<{
    created_at: string;
    custom_attributes: Array<{
      key: string;
      name: string;
      value: string;
    }>;
    dept: string;
    email: string;
    employee_unique_id: string;
    first_name: string;
    group_ids: string[];
    id: string;
    im_group_ids: string[];
    last_client_version: string;
    last_login_time: string;
    last_name: string;
    plan_united_type:
      | "1"
      | "2"
      | "4"
      | "8"
      | "16"
      | "32"
      | "64"
      | "128"
      | "256"
      | "512"
      | "1024"
      | "2048"
      | "4096"
      | "8192"
      | "16384"
      | "32768"
      | "65536"
      | "131072";
    pmi: number;
    role_id: string;
    status: "active" | "inactive" | "pending";
    timezone: string;
    type: 1 | 2 | 3 | 99;
    verified: 0 | 1;
  }>;
};

/**
 * Get a meeting
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/#operation/meeting
 */
export type ZoomMeetingResponse = {
  assistant_id: string;
  host_email: string;
  host_id: string;
  id: number;
  uuid: string;
  agenda: string;
  created_at: string;
  duration: number;
  encrypted_password: string;
  hnumber_password: string;
  join_url: string;
  occurrences: [
    {
      duration: number;
      occurrence_id: string;
      start_time: string;
      status: string;
    }
  ];
  password: string;
  pmi: string;
  pre_schedule: boolean;
  recurrence: {
    end_date_time: string;
    end_times: number;
    monthly_day: number;
    monthly_week: number;
    monthly_week_day: number;
    repeat_interval: number;
    type: number;
    weekly_days: "1" | "2" | "3" | "4" | "5" | "6" | "7";
  };
  settings: {
    allow_multiple_devices: boolean;
    alternative_hosts: string;
    alternative_hosts_email_notification: boolean;
    alternative_host_update_polls: boolean;
    approval_type: 0 | 1 | 2;
    approved_or_denied_countries_or_regions: {
      approved_list: string[];
      denied_list: string[];
      enable: boolean;
      method: "approve" | "deny";
    };
    audio: "both" | "telephony" | "voip";
    authentication_domains: string;
    authentication_exception: Array<{
      email: string;
      name: string;
      join_url: string;
    }>;
    authentication_name: string;
    authentication_option: string;
    auto_recording: "local" | "cloud" | "none";
    breakout_room: {
      enable: boolean;
      rooms: Array<{
        name: string;
        participants: string[];
      }>;
    };
    calendar_type: 1 | 2;
    close_registration: boolean;
    contact_email: string;
    contact_name: string;
    custom_keys: Array<{
      key: string;
      value: string;
    }>;
    email_notification: boolean;
    encryption_type: "enhanced_encryption" | "e2ee";
    focus_mode: boolean;
    global_dial_in_countries: string[];
    global_dial_in_numbers: Array<{
      city: string;
      country: string;
      country_name: string;
      number: string;
      type: "toll" | "tollfree";
    }>;
    host_video: boolean;
    jbh_time: 0 | 5 | 10;
    join_before_host: boolean;
    language_interpretation: {
      enable: boolean;
      interpreters: Array<{
        email: string;
        languages: string;
      }>;
    };
    meeting_authentication: boolean;
    mute_upon_entry: boolean;
    participant_video: boolean;
    private_meeting: boolean;
    registrants_confirmation_email: boolean;
    registrants_email_notification: boolean;
    registration_type: 1 | 2 | 3;
    show_share_button: boolean;
    use_pmi: boolean;
    waiting_room: boolean;
    waiting_room_options: {
      enable: boolean;
      admit_type: 1 | 2;
      auto_admit: 1 | 2 | 3 | 4;
      internal_user_auto_admit: 1 | 2 | 3 | 4 | 5;
    };
    watermark: boolean;
    host_save_video_order: boolean;
  };
  start_time: string;
  start_url: string;
  status: "waiting" | "started";
  timezone: string;
  topic: string;
  tracking_fields: Array<{
    field: string;
    value: string;
    visible: boolean;
  }>;
  type: 1 | 2 | 3 | 8;
};

/**
 * List all recordings
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/#operation/recordingsList
 */
export type ZoomRecordingsListResponse = {
  from: string;
  to: string;
  next_page_token: string;
  page_count: number;
  page_size: number;
  total_records: number;
  meetings: Array<{
    account_id: string;
    duration: number;
    host_id: string;
    id: number;
    recording_count: number;
    start_time: string;
    topic: string;
    total_size: number;
    type: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "99";
    uuid: string;
    recording_files: Array<{
      deleted_time: string;
      download_url: string;
      file_path: string;
      file_size: number;
      file_type:
        | "MP4"
        | "M4A"
        | "CHAT"
        | "TRANSCRIPT"
        | "CSV"
        | "TB"
        | "CC"
        | "CHAT_MESSAGE"
        | "SUMMARY";
      file_extension: "MP4" | "M4A" | "TXT" | "VTT" | "CSV" | "JSON" | "JPG";
      id: string;
      meeting_id: string;
      play_url: string;
      recording_end: string;
      recording_start: string;
      recording_type:
        | "shared_screen_with_speaker_view(CC)"
        | "shared_screen_with_speaker_view"
        | "shared_screen_with_gallery_view"
        | "speaker_view"
        | "active_speaker"
        | "gallery_view"
        | "shared_screen"
        | "audio_only"
        | "audio_transcript"
        | "chat_file"
        | "poll"
        | "host_video"
        | "closed_caption"
        | "timeline"
        | "thumbnail"
        | "audio_interpretation"
        | "summary"
        | "summary_next_steps"
        | "summary_smart_chapters";
      status: "completed";
    }>;
  }>;
};

/**
 * Get meeting recordings
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/#operation/recordingGet
 */
export type ZoomRecordingGetResponse = {
  account_id: string;
  duration: number;
  host_id: string;
  id: number;
  recording_count: number;
  start_time: string;
  topic: string;
  total_size: number;
  type: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "99";
  uuid: string;
  recording_files: Array<{
    deleted_time: string;
    download_url: string;
    file_path: string;
    file_size: string;
    file_type:
      | "MP4"
      | "M4A"
      | "CHAT"
      | "TRANSCRIPT"
      | "CSV"
      | "TB"
      | "CC"
      | "CHAT_MESSAGE"
      | "SUMMARY";
    file_extension: "MP4" | "M4A" | "TXT" | "VTT" | "CSV" | "JSON" | "JPG";
    id: string;
    meeting_id: string;
    play_url: string;
    recording_end: string;
    recording_start: string;
    recording_type:
      | "shared_screen_with_speaker_view(CC)"
      | "shared_screen_with_speaker_view"
      | "shared_screen_with_gallery_view"
      | "speaker_view"
      | "active_speaker"
      | "gallery_view"
      | "shared_screen"
      | "audio_only"
      | "audio_transcript"
      | "chat_file"
      | "poll"
      | "host_video"
      | "closed_caption"
      | "timeline"
      | "thumbnail"
      | "audio_interpretation"
      | "summary"
      | "summary_next_steps"
      | "summary_smart_chapters";
    status: string;
  }>;
  download_access_token: string;
  password: string;
  recording_play_passcode: string;
  participant_audio_files: Array<{
    download_url: string;
    file_name: string;
    file_path: string;
    file_size: number;
    file_type: string;
    id: string;
    play_url: string;
    recording_end: string;
    recording_start: string;
    status: "completed";
  }>;
};

export type ZoomAuthResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string | string[];
};

const basenc = Buffer.from(ZOOM_CLIENT_ID + ":" + ZOOM_CLIENT_SECRET).toString(
  "base64"
);

export async function zoomRequestToken() {
  const result = await got(
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${ZOOM_ACCOUNT_ID}`,
    {
      method: "POST",
      headers: {
        Authorization: "Basic " + basenc,
      },
    }
  );
  const body = JSON.parse(result.body) as ZoomAuthResponse;
  return body.access_token;
}

export async function zoomRequest(
  path: string,
  searchParams: ZoomQuery = {},
  method: Method = "GET"
): Promise<ZoomResponse> {
  const access_token = await zoomRequestToken();
  return await got("https://api.zoom.us/v2" + path, {
    searchParams,
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  }).json();
}

export async function zoomListRequest(
  path: string,
  listName: string,
  qs: ZoomQuery = {}
): Promise<ZoomResponse[]> {
  let next_page_token = "";
  const list: ZoomResponse[] = [];
  do {
    const response = await zoomRequest(
      path,
      next_page_token ? Object.assign(qs, { next_page_token }) : qs
    );
    list.push(...response[listName]);
    next_page_token = response.next_page_token;
  } while (next_page_token);
  return list;
}
