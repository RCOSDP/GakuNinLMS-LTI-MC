import type { UserSettingsProps } from "$server/models/userSettings";
import { api } from "./api";

export async function updateUserSettings(body: UserSettingsProps) {
  await api.apiV2UserSettingsPut({ body });
}
