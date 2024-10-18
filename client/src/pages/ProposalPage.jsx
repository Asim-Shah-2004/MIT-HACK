import { useEffect, useState } from 'react';
import { X, Check, X as Close, Search, FileText, PieChartIcon, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from 'sonner';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import io from 'socket.io-client';
import axios from 'axios';
import useTheme from "@/hooks/useTheme";
import Navbar from '@/components/Navbar';
import useAuth from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const ProposalPage = () => {
  const { isDarkMode } = useTheme();
  const [socket, setSocket] = useState();
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const [proposals, setProposals] = useState([]);
  const [proposalsSent, setProposalsSent] = useState([]);
  const [proposalsReceived, setProposalsReceived] = useState([]);

  const [selectedProposal, setSelectedProposal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const s = io(SOCKET_URL, {
      auth: {
        token: `Bearer ${token}`,
      },
    });

    setSocket(s);

    s.on("connect_error", () => {
      toast.error("Connection Error");
    });

    s.on("disconnect", () => {
      // toast.error("Disconnected from server");
    });

    return () => {
      s.disconnect();
    };
  }, []);

  // Load proposals from server
  useEffect(() => {
    const loadProposals = async () => {
      const response = await axios.get(`${SERVER_URL}/user/getAllProposals`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log(response.data);

        setProposalsSent(response.data.sentProposals);
        setProposalsReceived(response.data.receivedProposals);
        setProposals([...response.data.sentProposals, ...response.data.receivedProposals]);
      }
      else
        toast.error("Failed to connect to server");
    };

    loadProposals();
  }, []);

  const handleProposalChange = (proposalId, status) => {
    const proposal = proposalsReceived.find(p => p.proposalId === proposalId);

    if (proposal) {
      const { senderId } = proposal;
      // console.log(proposal);

      if (status === 'accepted') {
        socket.emit('acceptProposal', { senderId: user.userId, recipientId: senderId, proposalId, userType: user.role });

        socket.on('Proposal accepted and chatRoomCreated', (response) => {
          setProposals(proposals.map(p => (p.proposalId === proposalId ? { ...p, status } : p)));
          setProposalsReceived(proposals.map(p => (p.proposalId === proposalId ? { ...p, status } : p)));
        });
      }
      else if (status === 'rejected') {
        socket.emit('rejectProposal', { senderId: user.userId, recipientId: senderId, proposalId, userType: user.role });

        socket.on('Proposal rejected', (response) => {
          setProposals(proposals.map(p => (p.proposalId === proposalId ? { ...p, status } : p)));
          setProposalsReceived(proposals.map(p => (p.proposalId === proposalId ? { ...p, status } : p)));
        });
      }

      socket.on('error', (error) => {
        toast.error(error.message);
      });
    } else {
      console.error('Proposal not found');
    }
  };

  const filteredProposals = proposals.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const chartData = [
    { name: 'Pending', value: proposalsSent.filter(p => p.status === 'pending').length },
    { name: 'Accepted', value: proposalsSent.filter(p => p.status === 'accepted').length },
  ];

  const COLORS = ['#555', '#00Cd9F'];

  const truncateTitle = (title) => {
    return title.length > 18 ? `${title.slice(0, 18)}...` : title;
  };

  return (
    <>
      <Navbar />
      <div className={`container mx-auto p-4 ${isDarkMode ? 'bg-gray-950 text-light2' : 'bg-light2 text-dark1'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Card className={`hover:shadow-xl border-orange-500 border-dashed border-[2px] ${isDarkMode ? "bg-slate-950" : ""} transition-shadow duration-300`}>
            <CardHeader>
              <CardTitle className={`text-2xl font-bold flex items-center ${isDarkMode ? "text-white" : ""}`}>
                <FileText className={`mr-2 ${isDarkMode ? "text-white" : ""}`} />
                Pending Proposals
              </CardTitle>
            </CardHeader>
            <CardContent className={`overflow-y-auto max-h-[400px]`}>
              {proposalsReceived.filter(p => p.status === 'pending').length === 0 ? (
                <div className={`flex items-center justify-center h-32 text-muted-foreground`}>
                  <p>All caught up! No pending proposals.</p>
                </div>
              ) : (
                proposalsReceived.filter(p => p.status === 'pending').map(proposal => (
                  <div key={proposal.proposalId} className={`flex items-center justify-between rounded-lg mb-3 transition-colors duration-200 ${isDarkMode ? 'bg-gray-800' : 'bg-zinc-200'}`}>
                    <Button
                      variant="ghost"
                      className={`flex-1 justify-start text-left p-3 font-medium hover:bg-accent/20 ${isDarkMode ? 'text-white' : 'text-dark1'}`}
                      onClick={() => setSelectedProposal(proposal)}
                    >
                      {proposal.title}
                    </Button>
                    <div className={`flex space-x-2`}>
                      <Button variant="ghost" size="icon" onClick={() => handleProposalChange(proposal.proposalId, 'rejected')}>
                        <X className={`h-4 w-4 text-destructive`} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleProposalChange(proposal.proposalId, 'accepted')}>
                        <Check className={`h-4 w-4 text-green-500`} />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card className={`shadow-lg hover:shadow-xl  border-orange-500 border-dashed border-[2px] ${isDarkMode ? "bg-slate-950" : ""} transition-shadow duration-300`}>
            <CardHeader>
              <CardTitle className={`text-2xl ${isDarkMode ? "text-white" : ""} font-bold flex items-center`}>
                <PieChartIcon className={`mr-2 ${isDarkMode ? "text-white" : ""}`} />
                Proposal Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer className={`${isDarkMode ? "text-white" : ""}`} width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    isAnimationActive={true}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className={`flex justify-center mt-4 space-x-4`}>
                {chartData.map((entry, index) => (
                  <div key={`legend-${index}`} className={`flex items-center`}>
                    <div className={`w-3 h-3 mr-2 rounded-full`} style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className={`text-sm font-medium ${isDarkMode ? "text-white" : ""}`}>{entry.name}: {entry.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className={`mb-6 shadow-lg border-orange-500 border-dashed border-[2px] ${isDarkMode ? "bg-slate-950" : ""} hover:shadow-xl transition-shadow duration-300`}>
          <CardHeader>
            <CardTitle className={`text-2xl font-bold flex ${isDarkMode ? "text-white" : ""} items-center`}>
              <Search className={`mr-2  ${isDarkMode ? "text-white" : ""}`} />
              Find Proposal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`flex items-center space-x-2`}>
              <Input
                type="text"
                placeholder="Search proposals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`flex-1 rounded-lg shadow-sm transition-all duration-200 focus:ring-2 focus:ring-primary`}
              />
              <Button size="icon" className={` ${isDarkMode ? "bg-orange-600" : "bg-orange-600"}`}>
                <Search className={`h-4 w-4 ${isDarkMode ? "text-white" : ""} `} />
              </Button>
            </div>
            {searchQuery && (
              <div className={`mt-4 space-y-2`}>
                {filteredProposals.map(proposal => (
                  <div key={proposal.proposalId} className={`flex items-center pr-3 justify-between rounded-lg transition-colors duration-200 ${isDarkMode ? 'bg-gray-800' : 'bg-zinc-700 text-white'}`}>
                    <Button variant="ghost" className={`flex-1 justify-start ${isDarkMode ? 'text-white' : 'text-white'}`} onClick={() => setSelectedProposal(proposal)}>
                      {truncateTitle(proposal.title)}
                    </Button>
                    <span
                      className={`text-sm font-bold ${proposal.status === 'pending' ? 'text-gray-500' :
                        proposal.status === 'accepted' ? 'text-green-500' :
                          proposal.status === 'rejected' ? 'text-red-500' : ''
                        }`}
                    >
                      {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                    </span>
                  </div>
                ))}


              </div>
            )}


          </CardContent>
        </Card>

        <Card className={`shadow-lg border-orange-500 border-dashed border-[2px] ${isDarkMode ? "bg-slate-950" : ""} hover:shadow-xl transition-shadow duration-300`}>
          <CardHeader>
            <CardTitle className={`text-2xl font-bold flex items-center ${isDarkMode ? "text-white" : ""}`}>
              <Calendar className={`mr-2 ${isDarkMode ? "text-white" : ""}`} />
              Recent Proposals
            </CardTitle>
          </CardHeader>
          <CardContent className={`overflow-y-auto max-h-[300px]`}>
            {proposals.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5).map(proposal => (
              <div key={proposal.proposalId} className={`flex items-center justify-between py-3 ${isDarkMode ? "" : "bg-slate-200 hover:bg-slate-200"} mb-1 pr-4 hover:bg-gray-800  rounded-lg transition-colors duration-200 ${isDarkMode ? 'bg-gray-800' : ''}`}>
                <Button
                  variant="ghost"
                  className={`flex-1 justify-start ${isDarkMode ? "" : "bg-slate-200 hover:bg-slate-200"}font-medium ${isDarkMode ? 'text-white' : 'text-dark1'}`}
                  onClick={() => setSelectedProposal(proposal)}
                >
                  {truncateTitle(proposal.title)}
                </Button>
                <span className={`text-sm text-muted-foreground`}>{proposal.date}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Dialog open={!!selectedProposal} onOpenChange={() => setSelectedProposal(null)}>
          <DialogContent hideClose className={`${isDarkMode ? 'bg-gray-800 text-light2' : 'bg-white text-dark1'} max-w-sm sm:max-w-lg`}>
            <DialogHeader>
              <DialogTitle className={`${isDarkMode ? 'text-white' : 'text-dark1'}`}>{selectedProposal?.title}</DialogTitle>
            </DialogHeader>
            <div className={`space-y-4 p-4`}>
              <div>
                <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-dark1'}`}>Purpose</h3>
                <p className="text-sm">{selectedProposal?.purpose}</p>
              </div>
              <div>
                <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-dark1'}`}>Body</h3>
                <p className="text-sm">{selectedProposal?.body}</p>
              </div>
              <div>
                <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-dark1'}`}>Attachments</h3>
                <ul className={`list-disc list-inside text-sm`}>
                  {selectedProposal?.attachments.map((attachment, index) => (
                    <li key={index}>
                      <Button variant="link" className={`p-0  ${isDarkMode ? "text-white" : ""}`}>{attachment}</Button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {selectedProposal?.status === 'pending' && (
              <DialogFooter>
                <Button
                  variant="destructive"
                  className={`text-white`}
                  onClick={() => {
                    if (selectedProposal) {
                      handleProposalChange(selectedProposal.id, 'rejected');
                      setSelectedProposal(null); // Close the modal
                    }
                  }}
                >
                  Reject
                </Button>
                <Button
                  variant="outline"
                  className={`bg-green-500 mb-2 hover:bg-green-500 text-white`}
                  onClick={() => {
                    if (selectedProposal) {
                      handleProposalChange(selectedProposal.id, 'accepted');
                      setSelectedProposal(null); // Close the modal
                    }
                  }}
                >
                  Accept
                </Button>
              </DialogFooter>
            )}

          </DialogContent>
        </Dialog>

      </div>
    </>
  );
};

export default ProposalPage;
