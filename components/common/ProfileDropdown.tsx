import { Avatar, Dropdown, Grid, Text, User } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useCurrentUser } from "../../hooks/auth";

enum Actions {
  LogOut = "logout",
  Balance = "balance",
}

type TProps = {
  onSignOut(): void;
};

const ProfileDropdown: FC<TProps> = ({ onSignOut }) => {
  const user = useCurrentUser();
  const router = useRouter();

  const handleAction = (action: React.Key) => {
    switch (action) {
      case Actions.Balance:
        router.push("/profile/balance");
        break;
      case Actions.LogOut:
        onSignOut();
        break;

      default:
        break;
    }
  };
  return (
    <Grid.Container justify="flex-start" gap={2}>
      <Grid>
        <Dropdown placement="bottom-left">
          <Dropdown.Trigger>
            <Avatar
              bordered
              size="lg"
              as="button"
              color="secondary"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </Dropdown.Trigger>
          <Dropdown.Menu
            color="secondary"
            aria-label="Avatar Actions"
            onAction={handleAction}
          >
            <Dropdown.Item css={{ height: "$18" }}>
              <Text b color="inherit" css={{ d: "flex" }}>
                Logeado como
              </Text>
              <Text b color="inherit" css={{ d: "flex" }}>
                {user?.email}
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key={Actions.Balance} withDivider>
              Estado de cuenta
            </Dropdown.Item>
            <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
            <Dropdown.Item key="analytics" withDivider>
              Analytics
            </Dropdown.Item>
            <Dropdown.Item key="system">System</Dropdown.Item>
            <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
            <Dropdown.Item key="help_and_feedback" withDivider>
              Help & Feedback
            </Dropdown.Item>
            <Dropdown.Item key={Actions.LogOut} color="error" withDivider>
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Grid>
    </Grid.Container>
  );
};

export default ProfileDropdown;
