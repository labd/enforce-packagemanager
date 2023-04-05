type PackageManager = {
  name: "npm" | "yarn" | "pnpm" | "cnpm";
  version: string;
};

export const getUsedPackageManager = (): PackageManager | undefined => {
  if (!process.env.npm_config_user_agent) {
    return undefined;
  }

  const spec = process.env.npm_config_user_agent.split(" ")[0];
  const separatorPosition = spec.lastIndexOf("/");
  const name = spec.slice(0, separatorPosition);

  return {
    name: name === "npminstall" ? "cnpm" : (name as PackageManager["name"]),
    version: spec.slice(separatorPosition + 1),
  };
};
