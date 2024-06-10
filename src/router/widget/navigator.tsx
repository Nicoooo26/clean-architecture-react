import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavigatorElement, NavigatorGroup, NavigatorItem } from '../entity/navigate';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface Props {
    elements: NavigatorElement[];
    open: boolean;
    onClose: () => void;
}

export default function NavigatorDrawer(props: Props) {
    const [openListItems, setOpenListItems] = useState<string[]>([]);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleListItem = (path: string) => {
        setOpenListItems((prevState) => (prevState.includes(path) ? prevState.filter((item) => item !== path) : [...prevState, path]));
    };

    const navigateTo = (path: string) => {
        navigate(path);
    };

    const renderNavigators = (elements: NavigatorElement[]) => {
        return (
            <Box sx={{ width: 250 }}>
                <List>
                    {elements.map((navigator, index) => (
                        <React.Fragment key={index}>
                            {navigator instanceof NavigatorGroup ? (
                                <>
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => toggleListItem(navigator.path)}>
                                            {navigator.icon && <ListItemIcon>{navigator.icon}</ListItemIcon>}
                                            <ListItemText primary={navigator.title} />
                                            {openListItems.includes(navigator.path) ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                    </ListItem>
                                    {openListItems.includes(navigator.path) && (
                                        <List>
                                            {navigator.routes.map((route, routeIndex) => (
                                                <ListItem key={routeIndex} disablePadding>
                                                    <ListItemButton sx={{ pl: 6 }} onClick={() => navigateTo(route.path)} selected={location.pathname === route.path}>
                                                        {route.icon && <ListItemIcon>{route.icon}</ListItemIcon>}
                                                        <ListItemText primary={route.title} />
                                                    </ListItemButton>
                                                </ListItem>
                                            ))}
                                        </List>
                                    )}
                                </>
                            ) : navigator instanceof NavigatorItem ? (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton onClick={() => navigateTo(navigator.path)} selected={location.pathname === navigator.path}>
                                        {navigator.icon && <ListItemIcon>{navigator.icon}</ListItemIcon>}
                                        <ListItemText primary={navigator.title} />
                                    </ListItemButton>
                                </ListItem>
                            ) : null}
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </Box>
        );
    };

    return (
        <>
            <Drawer open={props.open} onClose={props.onClose}>
                {renderNavigators(props.elements)}
            </Drawer>
        </>
    );
}
