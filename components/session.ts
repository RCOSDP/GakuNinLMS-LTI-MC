import { useSession, SessionResponse } from "./api";
import { useRouter } from "./router";
import { useSnackbar } from "material-ui-snackbar-provider";

const lmsUrl = process.env.NEXT_PUBLIC_LMS_URL || "";

export function useLmsSession(): SessionResponse | undefined {
  const { data, error } = useSession();
  if (error && typeof window !== "undefined") {
    document.location.href = lmsUrl;
    return;
  }
  return data;
}

export function useLmsInstructor(): SessionResponse | undefined {
  const { data, error } = useSession();
  const router = useRouter();
  const { showMessage } = useSnackbar();
  if (error && typeof window !== "undefined") {
    document.location.href = lmsUrl;
    return;
  }
  if (data && !["instructor", "administrator"].includes(data.role)) {
    router.replace("/");
    showMessage("アクセス権限がありません");
  }
  return data;
}
