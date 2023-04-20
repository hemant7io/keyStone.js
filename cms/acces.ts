type Session = {
  itemId: string;
  data: {
    isAdmin: boolean;
  };
};

function hasSession({ session }: { session: Session | undefined }) {
  console.log("access-9", session);
  return Boolean(session);
}

function isAdmin({ session }: { session: Session | undefined }) {
  console.log("isdamin", session);
  // you need to have a session to do this
  if (!session) return false;
  // admins can do anything
  if (session.data.isAdmin) return true;
  return false;
}

export { hasSession, isAdmin };
