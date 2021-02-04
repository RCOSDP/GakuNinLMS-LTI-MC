import { UrlObject } from "url";
import { useRouter } from "next/router";
import { useSessionAtom } from "$store/session";
import UnlinkedProblem from "$organisms/UnlinkedProblem";
import Placeholder from "$templates/Placeholder";
import { pagesPath } from "$utils/$path";
import { useLoggerInit } from "$utils/eventLogger/loggerSessionPersister";

function Replace(props: { href: string | UrlObject }) {
  const router = useRouter();
  router.replace(props.href);
  return <Placeholder />;
}

function Router() {
  const { session, isInstructor } = useSessionAtom();

  // NOTE: eventLogger のために使用
  useLoggerInit(session);

  const ltiResourceLink = session?.ltiResourceLink;

  if (!ltiResourceLink && isInstructor)
    return <Replace href={pagesPath.link.$url()} />;

  if (!ltiResourceLink) return <UnlinkedProblem />;

  return (
    <Replace
      href={pagesPath.book.$url({
        query: { bookId: ltiResourceLink.bookId },
      })}
    />
  );
}

export default Router;
