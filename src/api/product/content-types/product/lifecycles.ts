export default {
  async beforeUpdate(event) {
    const { params, state } = event;
    const { data } = params;
    const userRole = state?.user?.role?.code; // e.g. "editor"

    if (userRole === "branch-mhhurpgg") {
      // Only allow `status` field
      const allowedFields = ["stocks"];
      const disallowed = Object.keys(data).filter(
        (key) => !allowedFields.includes(key)
      );
      if (disallowed.length > 0) {
        throw new Error(
          `You are not allowed to modify fields: ${disallowed.join(", ")}`
        );
      }
    }
  },
};
