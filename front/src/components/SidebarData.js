import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
	{
		title: 'Inicio',
		path: '/',
		icon: <AiIcons.AiFillHome />,
		cName: 'nav-text'
	},
	{
		title: 'Productos',
		path: '/products',
		icon: <FaIcons.FaCartPlus />,
		cName: 'nav-text'
	},
	{
		title: 'Clientes',
		path: '/clients',
		icon: <FaIcons.FaUserAlt />,
		cName: 'nav-text'
	},
	{
		title: 'Facturas',
		path: '/invoices',
		icon: <IoIcons.IoIosPaper />,
		cName: 'nav-text'
	},
	{
		title: 'Soporte',
		path: '/support',
		icon: <IoIcons.IoMdHelpCircle />,
		cName: 'nav-text'
	}
];