import { useState } from 'react';
import { X, Check, X as Close, Search } from 'lucide-react';
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
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Label
} from 'recharts';
import useTheme from "@/hooks/useTheme";
import Navbar from "./Navbar";

const ProposalPage = () => {
  const { isDarkMode } = useTheme();
  const [proposals, setProposals] = useState([
    { id: '1', title: 'Website Redesign', purpose: 'Improve online presence', body: 'Detailed proposal for website redesign...', attachments: ['design_mockups.pdf'], status: 'pending', date: '2023-06-15' },
    { id: '2', title: 'Marketing Campaign', purpose: 'Increase brand awareness', body: 'Comprehensive marketing strategy...', attachments: ['campaign_budget.xlsx'], status: 'pending', date: '2023-06-14' },
    { id: '3', title: 'Product Launch', purpose: 'Introduce new product line', body: 'Launch plan for new product series...', attachments: ['product_specs.pdf', 'market_analysis.pptx'], status: 'pending', date: '2023-06-13' },
    { id: '4', title: 'Office Expansion', purpose: 'Accommodate growing team', body: 'Proposal for new office space...', attachments: ['floor_plan.pdf'], status: 'accepted', date: '2023-06-12' },
    { id: '5', title: 'Employee Training Program', purpose: 'Enhance team skills', body: 'Comprehensive training curriculum...', attachments: ['training_schedule.xlsx'], status: 'accepted', date: '2023-06-11' },
  ]);

  const [selectedProposal, setSelectedProposal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleProposalChange = (id, status) => {
    setProposals(proposals.map(p => (p.id === id ? { ...p, status } : p)));
  };

  const filteredProposals = proposals.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const chartData = [
    { name: 'Pending', value: proposals.filter(p => p.status === 'pending').length },
    { name: 'Accepted', value: proposals.filter(p => p.status === 'accepted').length },
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <>
      <Navbar />
      <div className={`container mx-auto p-4 ${isDarkMode ? 'bg-dark1 text-light2' : 'bg-light2 text-dark1'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Card className={isDarkMode ? 'bg-dark2' : 'bg-light2'}>
            <CardHeader>
              <CardTitle className={isDarkMode ? 'text-white' : 'text-dark1'}>Pending Proposals</CardTitle>
            </CardHeader>
            <CardContent className="overflow-y-auto h-60">
              {proposals.filter(p => p.status === 'pending').map(proposal => (
                <div key={proposal.id} className="flex items-center justify-between p-2 border-2 rounded-xl mb-1">
                  <Button
                    variant="link"
                    className={`flex flex-1 justify-start ${isDarkMode ? 'text-white' : 'text-dark1'} text-md`}
                    onClick={() => setSelectedProposal(proposal)}
                  >
                    {proposal.title}
                  </Button>
                  <div>
                    <Button variant="ghost" size="icon" className="mr-4 border-2" onClick={() => handleProposalChange(proposal.id, 'rejected')}>
                      <X className={"h-4 w-4 text-red-500"} />
                    </Button>
                    <Button variant="ghost" size="icon" className="border-2" onClick={() => handleProposalChange(proposal.id, 'rejected')}>
                      <Check className={"h-4 w-4 text-green-500"} />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className={isDarkMode ? 'bg-dark2' : 'bg-light2'}>
            <CardHeader>
              <CardTitle className={isDarkMode ? 'text-white' : 'text-dark1'}>Proposal Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <div className="select-none"> Prevents text selection */}
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      isAnimationActive={true} // Enable animation
                      // pointerEvents="none" // Disable interactions
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              {/* </div> */}
              <div className="flex justify-center mt-4">
                {chartData.map((entry, index) => (
                  <div key={`legend-${index}`} className="flex items-center mr-4">
                    <div className="w-3 h-3 mr-1" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className={isDarkMode ? 'text-white' : 'text-dark1'}>{entry.name}: {entry.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className={`mb-4 ${isDarkMode ? 'bg-dark2' : 'bg-light2'}`}>
          <CardHeader>
            <CardTitle className={isDarkMode ? 'text-white' : 'text-dark1'}>Find Proposal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Search proposals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`flex-1 ${isDarkMode ? 'bg-dark2 text-white' : 'bg-light2 text-dark1'}`}
              />
              <Button size="icon" className={isDarkMode ? 'text-white' : 'text-dark1'}>
                <Search className={`h-4 w-4 ${isDarkMode ? 'text-white' : 'text-dark1'}`} />
              </Button>
            </div>
            {searchQuery && (
              <div className="mt-4">
                {filteredProposals.map(proposal => (
                  <div key={proposal.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <Button variant="link" className={isDarkMode ? 'text-white' : 'text-dark1'} onClick={() => setSelectedProposal(proposal)}>
                      {proposal.title}
                    </Button>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-muted-foreground'}`}>{proposal.status}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className={isDarkMode ? 'bg-dark2' : 'bg-light2'}>
          <CardHeader>
            <CardTitle className={isDarkMode ? 'text-white' : 'text-dark1'}>Recent Proposals</CardTitle>
          </CardHeader>
          <CardContent className="overflow-y-auto h-60">
            {proposals.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5).map(proposal => (
              <div key={proposal.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <Button
                  variant="link"
                  className={`flex flex-1 justify-start ${isDarkMode ? 'text-white' : 'text-dark1'} text-md`}
                  onClick={() => setSelectedProposal(proposal)}
                >
                  {proposal.title}
                </Button>
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-muted-foreground'}`}>{proposal.date}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Dialog open={!!selectedProposal} onOpenChange={() => setSelectedProposal(null)}>
          <DialogContent hideClose className={isDarkMode ? 'bg-dark2 text-light2 [&>button]:hidden' : 'bg-light2 text-dark1 [&>button]:hidden'}>
            <DialogHeader>
              <DialogTitle className={isDarkMode ? 'text-white' : 'text-dark1'}>{selectedProposal?.title}</DialogTitle>
              <Button variant="ghost" size="icon" className={`absolute right-4 top-4 ${isDarkMode ? 'text-white' : 'text-dark1'}`} onClick={() => setSelectedProposal(null)}>
                <Close className={`h-4 w-4 ${isDarkMode ? 'text-white' : 'text-dark1'}`} />
              </Button>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-dark1'}`}>Purpose</h3>
                <p>{selectedProposal?.purpose}</p>
              </div>
              <div>
                <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-dark1'}`}>Body</h3>
                <p>{selectedProposal?.body}</p>
              </div>
              <div>
                <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-dark1'}`}>Attachments</h3>
                <ul className="list-disc list-inside">
                  {selectedProposal?.attachments.map((attachment, index) => (
                    <li key={index}>
                      <Button variant="link" className="p-0">{attachment}</Button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" className={isDarkMode ? 'text-white' : 'text-dark1'} onClick={() => selectedProposal && handleProposalChange(selectedProposal.id, 'rejected')}>
                Reject
              </Button>
              <Button className={isDarkMode ? 'text-white' : 'text-dark1'} onClick={() => selectedProposal && handleProposalChange(selectedProposal.id, 'accepted')}>
                Accept
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ProposalPage;
