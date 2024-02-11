const memberstack = useMemberstack();

// Test member
const setTestMember = async () => {
    try {
      await memberstack.loginMemberEmailPassword({
        email: testEmail,
        password: testPassword
      })
      .then(async ({ data: member }) => {
          if (member !== null) {
            dispatchOptions = await memberstack.getMemberJSON();
            setMemberState(dispatchOptions)
          } else {
            return
          }
        })
      .catch((error) => {
        return
      })
    } catch (error) {
      return
    }
  }