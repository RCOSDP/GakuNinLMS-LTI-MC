import { UserSettingsProp } from "$server/validators/userSettings";
import { api } from "./api";

export async function updateUserSettings(body: UserSettingsProp) {
  await api.apiV2UserSettingsPut({ body });
}
