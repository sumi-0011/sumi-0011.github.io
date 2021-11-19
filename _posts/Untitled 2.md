```
package router;

import java.awt.Color;
import java.awt.Container;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;
import java.net.InetAddress;
import java.util.ArrayList;
import java.util.HashMap;

import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JTextArea;
import javax.swing.UIManager;
import javax.swing.border.TitledBorder;

public class ApplicationLayer extends JFrame implements BaseLayer {

	public int nUpperLayerCount = 0;
	public int nUnderLayerCount = 0;

	public String pLayerName = null;
	public BaseLayer p_UnderLayer = null;
	public ArrayList<BaseLayer> p_aUpperLayer = new ArrayList<BaseLayer>();
	public ArrayList<BaseLayer> p_aUnderLayer = new ArrayList<BaseLayer>();

	private static LayerManager m_LayerMgr = new LayerManager();

	public static ArpTable arpTable = null;

	Container panel;
	JTextArea arpCacheArea;
	JTextArea proxyArea;
	JTextArea SRArea;

	JButton addSR_Button;
	JButton delSR_Button;
	JButton delArp_Button;
	JButton delProxy_Button;
	JButton addProxy_Button;
	JButton settingButton;

	static JComboBox<String> NICComboBox1;
	static JComboBox<String> NICComboBox2;

	int adapterNumber1 = 0;
	int adapterNumber2 = 0;

	String Text;
	static RoutingTable router;

	public static void main(String[] args) {

		m_LayerMgr.AddLayer(new NILayer("NI"));
		m_LayerMgr.AddLayer(new EthernetLayer("Ethernet"));
		m_LayerMgr.AddLayer(new ARPLayer("ARP"));
		m_LayerMgr.AddLayer(new IPLayer("IP"));

		// Connect according to layer architecture
		m_LayerMgr.ConnectLayers("NI ( *Ethernet ( +IP ( -ARP ) *ARP ) )");

		m_LayerMgr.AddLayer(new NILayer("NIs"));
		m_LayerMgr.AddLayer(new EthernetLayer("Ethernets"));
		m_LayerMgr.AddLayer(new ARPLayer("ARPs"));
		m_LayerMgr.AddLayer(new IPLayer("IPs"));

		// Connect according to layer architecture
		m_LayerMgr.ConnectLayers("NIs ( *Ethernets ( +IPs ( -ARPs ) *ARPs ) )");

		m_LayerMgr.AddLayer(new ApplicationLayer("App"));

		// Connect IP and IPs
		((IPLayer) m_LayerMgr.GetLayer("IP")).setOtherLayer((IPLayer) m_LayerMgr.GetLayer("IPs"));
		((IPLayer) m_LayerMgr.GetLayer("IPs")).setOtherLayer((IPLayer) m_LayerMgr.GetLayer("IP"));

		arpTable = new ArpTable();
		arpTable.setAppLayer((ApplicationLayer) m_LayerMgr.GetLayer("App"));

		// Set ARP's ArpTable to arpTable and ARPs's ArpTable to arpTable
		((ARPLayer) m_LayerMgr.GetLayer("ARP")).setArpTable(arpTable);
		((ARPLayer) m_LayerMgr.GetLayer("ARPs")).setArpTable(arpTable);

		router = new RoutingTable();

		// Set IP's RoutingTable to router and IPs's RoutingTable to router
		((IPLayer) m_LayerMgr.GetLayer("IP")).setRoutingTable(router);
		((IPLayer) m_LayerMgr.GetLayer("IPs")).setRoutingTable(router);

	}

	public ApplicationLayer(String pName) {
		pLayerName = pName;
		this.setTitle("Static Router");

		this.setBounds(350, 100, 800, 500);
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

		panel = this.getContentPane();

		panel.setLayout(null);

		// Static Routing table
		JPanel SRPanel = new JPanel();
		SRPanel.setBorder(new TitledBorder(UIManager.getBorder("TitledBorder.border"), "Static Routing Table",
				TitledBorder.CENTER, TitledBorder.TOP, null, new Color(0, 0, 0)));
		SRPanel.setBounds(5, 10, 400, 399);
		panel.add(SRPanel);
		SRPanel.setLayout(null);

		SRArea = new JTextArea();
		SRArea.setText("");
		SRArea.setEditable(false);
		SRArea.setBounds(10, 20, 380, 315);
		SRPanel.add(SRArea);

		// Add element of router
		addSR_Button = new JButton("Add");
		addSR_Button.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if (e.getSource() == addSR_Button) {
					RoutingAddApp RAapp = new RoutingAddApp();
					RAapp.setAppLayer((ApplicationLayer) m_LayerMgr.GetLayer("App"));
					RAapp.setRoutingTable(router);
				}
			}
		});

		addSR_Button.setBounds(100, 350, 90, 30);
		SRPanel.add(addSR_Button);

		// Delete all elements of the router
		delSR_Button = new JButton("Delete");
		delSR_Button.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				if (e.getSource() == delSR_Button) {
					router.removeAll();
					SRArea.setText("");
				}
			}
		});
		delSR_Button.setBounds(200, 350, 90, 30);
		SRPanel.add(delSR_Button);

		// ARP
		JPanel arpPanel = new JPanel();
		arpPanel.setBorder(new TitledBorder(UIManager.getBorder("TitledBorder.border"), "ARP", TitledBorder.CENTER,
				TitledBorder.TOP, null, new Color(0, 0, 0)));
		arpPanel.setBounds(410, 10, 368, 280);
		panel.add(arpPanel);
		arpPanel.setLayout(null);

		arpCacheArea = new JTextArea();
		arpCacheArea.setEditable(false);
		arpCacheArea.setBounds(10, 20, 350, 210);
		arpPanel.add(arpCacheArea);

		// Delete all elements of the arpTable
		delArp_Button = new JButton("Delete");
		delArp_Button.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				arpCacheArea.setText("");
				arpTable.allDelete();
			}

		});

		delArp_Button.setBounds(142, 240, 90, 30);
		arpPanel.add(delArp_Button);

		// Proxy ARP
		JPanel proxyArpPanel = new JPanel();
		proxyArpPanel.setBorder(new TitledBorder(UIManager.getBorder("TitledBorder.border"), "Proxy ARP",
				TitledBorder.CENTER, TitledBorder.TOP, null, new Color(0, 0, 0)));
		proxyArpPanel.setBounds(410, 290, 368, 120);
		panel.add(proxyArpPanel);
		proxyArpPanel.setLayout(null);

		proxyArea = new JTextArea();
		proxyArea.setEditable(false);
		proxyArea.setBounds(10, 20, 350, 55);
		proxyArpPanel.add(proxyArea);

		// Add element of Proxy ARP
		addProxy_Button = new JButton("Add");
		addProxy_Button.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if (e.getSource() == addProxy_Button) {
					ARPAddApp AAapp = new ARPAddApp();
				}
			}
		});

		addProxy_Button.setBounds(92, 82, 90, 30);
		proxyArpPanel.add(addProxy_Button);

		delProxy_Button = new JButton("Delete");

		delProxy_Button.setBounds(192, 82, 90, 30);
		proxyArpPanel.add(delProxy_Button);

		// Setting
		JPanel settingPanel = new JPanel();
		settingPanel.setBorder(new TitledBorder(UIManager.getBorder("TitledBorder.border"), "Setting",
				TitledBorder.CENTER, TitledBorder.TOP, null, new Color(0, 0, 0)));
		settingPanel.setBounds(5, 405, 773, 53);
		panel.add(settingPanel);
		settingPanel.setLayout(null);

		NICComboBox1 = new JComboBox();
		NICComboBox1.setBounds(15, 15, 300, 30);
		settingPanel.add(NICComboBox1);

		NICComboBox2 = new JComboBox();
		NICComboBox2.setBounds(325, 15, 300, 30);
		settingPanel.add(NICComboBox2);

		settingButton = new JButton("Setting");
		settingButton.setBounds(650, 15, 90, 30);
		settingPanel.add(settingButton);

		for (int i = 0; ((NILayer) m_LayerMgr.GetLayer("NI")).getAdapterList().size() > i; i++) {
			String s = ((NILayer) m_LayerMgr.GetLayer("NI")).GetAdapterObject(i).getDescription();
			s += i;
			NICComboBox1.addItem(s);
		}

		for (int i = 0; ((NILayer) m_LayerMgr.GetLayer("NIs")).getAdapterList().size() > i; i++) {
			String s = ((NILayer) m_LayerMgr.GetLayer("NIs")).GetAdapterObject(i).getDescription();
			s += i;
			NICComboBox2.addItem(s);

		}

		NICComboBox1.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent arg0) {
				adapterNumber1 = NICComboBox1.getSelectedIndex();
				try {
					InetAddress local = InetAddress.getLocalHost();
					local = InetAddress.getByAddress(str2Byte("192.168.1.1"));
					String ip = local.getHostAddress();
					((NILayer) m_LayerMgr.GetLayer("NI")).SetAdapterNumber(adapterNumber1);
					((ARPLayer) m_LayerMgr.GetLayer("ARP")).SetEnetAddrARP(((NILayer) m_LayerMgr.GetLayer("NI"))
							.GetAdapterObject(adapterNumber1).getHardwareAddress());
					((ARPLayer) m_LayerMgr.GetLayer("ARP")).SetIPAddrARP(str2Byte(ip));
					((EthernetLayer) m_LayerMgr.GetLayer("Ethernet"))
							.SetEnetSrcAddress(((NILayer) m_LayerMgr.GetLayer("NI")).GetAdapterObject(adapterNumber1)
									.getHardwareAddress());
					byte[] ipInByte = ((ApplicationLayer) m_LayerMgr.GetLayer("App")).str2Byte(ip);
					((IPLayer) m_LayerMgr.GetLayer("IP")).SetIpSrcAddress(ipInByte);
					System.out.println("combo 1 set in " + ip);
				} catch (IOException e1) {
					e1.printStackTrace();
				}
			}

		});

		NICComboBox2.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent arg0) {
				adapterNumber2 = NICComboBox2.getSelectedIndex();
				try {
					InetAddress local = InetAddress.getLocalHost();
					local = InetAddress.getByAddress(str2Byte("192.168.2.1"));
					String ip = local.getHostAddress();
					((NILayer) m_LayerMgr.GetLayer("NIs")).SetAdapterNumber(adapterNumber2);
					((ARPLayer) m_LayerMgr.GetLayer("ARPs")).SetEnetAddrARP(((NILayer) m_LayerMgr.GetLayer("NIs"))
							.GetAdapterObject(adapterNumber2).getHardwareAddress());
					((ARPLayer) m_LayerMgr.GetLayer("ARPs")).SetIPAddrARP(str2Byte(ip));
					((EthernetLayer) m_LayerMgr.GetLayer("Ethernets"))
							.SetEnetSrcAddress(((NILayer) m_LayerMgr.GetLayer("NIs")).GetAdapterObject(adapterNumber2)
									.getHardwareAddress());
					byte[] ipInByte = ((ApplicationLayer) m_LayerMgr.GetLayer("App")).str2Byte(ip);
					((IPLayer) m_LayerMgr.GetLayer("IPs")).SetIpSrcAddress(ipInByte);
					System.out.println("combo 2 set in " + ip);
				} catch (IOException e1) {
					e1.printStackTrace();
				}
			}

		});

		setVisible(true);
	}

	// Print router element to SRArea.
	String SRAreaStr;

	public void setSRArea(String input) {
		SRAreaStr = SRArea.getText();
		SRAreaStr += input;
		SRArea.setText(SRAreaStr);
	}

	// - get_MacAddress(byte[] byte_MacAddress)
	// Convert the byte_MacAddress into the desired String format and Return the
	// String.
	public String get_MacAddress(byte[] byte_MacAddress) {
		String MacAddress = "";
		for (int i = 0; i < 6; i++) {
			MacAddress += String.format("%02X%s", byte_MacAddress[i], (i < MacAddress.length() - 1) ? "" : "");
			if (i != 5) {
				MacAddress += "-";
			}
		}
		return MacAddress;
	}

	// - reload()
	// Print all elements of arpTable to arpCacheArea.
	public void reload() {

		HashMap<byte[], byte[]> arpCacheMap = arpTable.getArpCache();
		String str = "";

		for (byte[] key : arpCacheMap.keySet()) {
			byte[] value = arpCacheMap.get(key);
			String keyStr = "";
			String mac = "";
			for (int i = 0; i < 4; i++) {
				if (i != 3) {
					if (key[i] < 0)
						keyStr += key[i] + 256 + ".";
					else
						keyStr += key[i] + ".";
				} else {
					if (key[i] < 0)
						keyStr += key[i] + 256;
					else
						keyStr += key[i];
				}
			}
			if (value == null) {
				str += keyStr + "  ??-??-??-??-??-??  Incomplete\n";
			} else {
				mac = get_MacAddress(value);
				str += keyStr + "  " + mac + "  Complete\n";
			}

		}
		arpCacheArea.setText(str);
	}

	// - str2Byte()
	// Converts a String into a byte array.
	public byte[] str2Byte(String addr) {
		String Addr = addr.replaceAll("-", "\\.");
		String[] str = Addr.split("\\.");

		int num = str.length;
		byte[] a = new byte[num];
		if (num == 4) {
			for (int i = 0; i < num; i++) {
				a[i] = (byte) Integer.parseInt(str[i]);
			}
		} else {
			for (int i = 0; i < num; i++) {
				a[i] = (byte) Integer.parseInt(str[i], 16);
			}
		}

		return a;
	}

	@Override
	public void SetUnderLayer(BaseLayer pUnderLayer) {
		if (pUnderLayer == null)
			return;
		this.p_UnderLayer = pUnderLayer;
	}

	@Override
	public void SetUpperLayer(BaseLayer pUpperLayer) {
		if (pUpperLayer == null)
			return;
		this.p_aUpperLayer.add(nUpperLayerCount++, pUpperLayer);
	}

	@Override
	public String GetLayerName() {
		return pLayerName;
	}

	@Override
	public BaseLayer GetUnderLayer(int nindex) {
		if (nindex < 0 || nindex > nUnderLayerCount || nUnderLayerCount < 0)
			return null;
		return p_aUnderLayer.get(nindex);
	}

	@Override
	public BaseLayer GetUpperLayer(int nindex) {
		if (nindex < 0 || nindex > nUpperLayerCount || nUpperLayerCount < 0)
			return null;
		return p_aUpperLayer.get(nindex);
	}

	@Override
	public void SetUpperUnderLayer(BaseLayer pUULayer) {
		this.SetUpperLayer(pUULayer);
		pUULayer.SetUnderLayer(this);

	}
}
```





```
package router;

import java.awt.Container;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextField;

public class ARPAddApp extends JFrame {
	Container panel;

	JButton addButton;
	JButton cancelButton;

	JLabel devLabel;
	JLabel macLabel;
	JLabel ipLabel;
	JLabel flagLabel;
	JLabel interfaceLabel;

	JTextField device;
	JTextField mac_addr;
	JTextField ip_addr;
	JTextField interFace;

	public ARPAddApp() {
		this.setTitle("Proxy ARP");

		this.setBounds(500, 250, 330, 240);
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

		panel = this.getContentPane();

		panel.setLayout(null);

		devLabel = new JLabel("Device");
		devLabel.setBounds(25, 20, 100, 30);

		device = new JTextField();
		device.setBounds(100, 20, 200, 30);

		panel.add(devLabel);
		panel.add(device);

		macLabel = new JLabel("Mac_addr");
		macLabel.setBounds(25, 60, 100, 30);

		mac_addr = new JTextField();
		mac_addr.setBounds(100, 60, 200, 30);

		panel.add(macLabel);
		panel.add(mac_addr);

		ipLabel = new JLabel("ip_addr");
		ipLabel.setBounds(25, 100, 100, 30);

		ip_addr = new JTextField();
		ip_addr.setBounds(100, 100, 200, 30);

		panel.add(ipLabel);
		panel.add(ip_addr);

		addButton = new JButton("Add");

		addButton.setBounds(55, 150, 90, 30);
		panel.add(addButton);

		// Close ARPAddApp window.
		cancelButton = new JButton("Close");
		cancelButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if (e.getSource() == cancelButton) {
					dispose();
				}
			}
		});

		cancelButton.setBounds(175, 150, 90, 30);
		panel.add(cancelButton);

		setVisible(true);

	}
}
```







```
package router;

import java.awt.Checkbox;
import java.awt.Container;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextField;

public class RoutingAddApp extends JFrame {
	Container panel;

	JButton addButton;
	JButton cancelButton;

	JLabel desLabel;
	JLabel netLabel;
	JLabel gateLabel;
	JLabel flagLabel;
	JLabel interfaceLabel;

	JTextField destination;
	JTextField netmask;
	JTextField gateway;
	JTextField interFace;

	Checkbox upChk;
	Checkbox gateChk;
	Checkbox hostChk;

	String flagStr = "";

	public ApplicationLayer app;
	public RoutingTable router;

	public RoutingAddApp() {
		this.setTitle("StaticRouter Add");

		this.setBounds(500, 250, 330, 300);
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

		panel = this.getContentPane();
		panel.setLayout(null);

		desLabel = new JLabel("Destination");
		desLabel.setBounds(20, 20, 100, 30);

		destination = new JTextField();
		destination.setBounds(100, 20, 200, 30);

		panel.add(desLabel);
		panel.add(destination);

		netLabel = new JLabel("Netmask");
		netLabel.setBounds(25, 60, 100, 30);

		netmask = new JTextField();
		netmask.setBounds(100, 60, 200, 30);

		panel.add(netLabel);
		panel.add(netmask);

		gateLabel = new JLabel("Gateway");
		gateLabel.setBounds(25, 100, 100, 30);

		gateway = new JTextField();
		gateway.setBounds(100, 100, 200, 30);

		panel.add(gateLabel);
		panel.add(gateway);

		flagLabel = new JLabel("Flag");
		flagLabel.setBounds(30, 140, 70, 30);

		upChk = new Checkbox("UP");
		upChk.setBounds(110, 140, 40, 30);

		gateChk = new Checkbox("Gateway");
		gateChk.setBounds(150, 140, 70, 30);

		hostChk = new Checkbox("Host");

		hostChk.setBounds(220, 140, 70, 30);

		panel.add(flagLabel);
		panel.add(upChk);
		panel.add(gateChk);
		panel.add(hostChk);

		interfaceLabel = new JLabel("Interface");
		interfaceLabel.setBounds(25, 180, 70, 30);

		interFace = new JTextField();
		interFace.setBounds(100, 180, 200, 30);

		panel.add(interfaceLabel);
		panel.add(interFace);

		// Add element of router.
		addButton = new JButton("Add");
		addButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if (e.getSource() == addButton) {
					String inputDst = destination.getText();
					String inputNet = netmask.getText();
					String inputGate = gateway.getText();
					String inputInterface = interFace.getText();

					if (upChk.getState()) {
						flagStr += "U";
					}

					if (gateChk.getState()) {
						flagStr += "G";
					}

					if (hostChk.getState()) {
						flagStr += "H";
					}

					String input = inputDst + " " + inputNet + " " + inputGate + " " + flagStr + " " + inputInterface
							+ "\n";
					app.setSRArea(input);
					destination.setText("");
					netmask.setText("");
					gateway.setText("");
					interFace.setText("");
					byte[] dstByte = new byte[4];
					byte[] netByte = new byte[4];
					byte[] gateByte = new byte[4];
					byte[] interfaceByte = new byte[4];

					dstByte = str2Byte(inputDst);
					netByte = str2Byte(inputNet);
					gateByte = str2Byte(inputGate);
					interfaceByte = str2Byte(inputInterface);

					router.addEntry(dstByte, netByte, gateByte, flagStr, interfaceByte);

					dispose();
				}
			}
		});
		addButton.setBounds(55, 220, 90, 30);
		panel.add(addButton);

		// Close RoutingAddApp window.
		cancelButton = new JButton("Close");
		cancelButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if (e.getSource() == cancelButton) {
					dispose();
				}
			}
		});

		cancelButton.setBounds(175, 220, 90, 30);
		panel.add(cancelButton);

		setVisible(true);

	}

	// - setAppLayer()
	// Setting app.
	public void setAppLayer(ApplicationLayer appLayer) {
		this.app = appLayer;
	}

	// - setRoutingTable()
	// Setting router.
	public void setRoutingTable(RoutingTable router) {
		this.router = router;
	}

	// - str2Byte()
	// Converts a String into a byte array.
	public byte[] str2Byte(String addr) {
		String Addr = addr.replaceAll("-", "\\.");
		String[] str = Addr.split("\\.");

		int num = str.length;
		byte[] a = new byte[num];
		if (num == 4) {
			for (int i = 0; i < num; i++) {
				a[i] = (byte) Integer.parseInt(str[i]);
			}
		} else {
			for (int i = 0; i < num; i++) {
				a[i] = (byte) Integer.parseInt(str[i], 16);
			}
		}

		return a;
	}

}
```

