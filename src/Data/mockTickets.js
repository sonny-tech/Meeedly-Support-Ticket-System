const mockTickets = [
    {
        id: "TKT-001",
        title: "Cannot login to my account",
        description: "I've been trying to login for 2 days but keep getting an error saying 'invalid credentials' even though I just reset my password.",
        status: "open",
        priority: "high",
        category: "auth",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        messages: [
            {
                id: "MSG-001",
                author: "User",
                content: "I've been trying to login for 2 days but keep getting an error saying 'invalid credentials' even though I just reset my password.",
                timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                isStaff: false,
            }
        ],
    },
    {
        id: "TKT-002",
        title: "Charged twice for my subscription",
        description: "I noticed two charges of $49.99 on my credit card statement this month. Please refund the duplicate charge.",
        status: "in-progress",
        priority: "high",
        category: "billing",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        messages: [
            {
                id: "MSG-002",
                author: "User",
                content: "I noticed two charges of $49.99 on my credit card statement this month. Please refund the duplicate charge.",
                timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                isStaff: false,
            },
            {
                id: "MSG-003",
                author: "Support",
                content: "Hi, we can see the duplicate charge and are processing your refund. It should appear within 3-5 business days.",
                timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
                isStaff: true,
            }
        ],
    },
    {
        id: "TKT-003",
        title: "App crashes on startup",
        description: "Every time I open the app on my iPhone it crashes immediately. I have tried reinstalling but the issue persists.",
        status: "open",
        priority: "high",
        category: "technical",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        messages: [
            {
                id: "MSG-004",
                author: "User",
                content: "Every time I open the app on my iPhone it crashes immediately. I have tried reinstalling but the issue persists.",
                timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                isStaff: false,
            }
        ],
    },
    {
        id: "TKT-004",
        title: "How do I export my data?",
        description: "I would like to export all my data before cancelling my account. Is there a way to do this?",
        status: "resolved",
        priority: "low",
        category: "general",
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        messages: [
            {
                id: "MSG-005",
                author: "User",
                content: "I would like to export all my data before cancelling my account. Is there a way to do this?",
                timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
                isStaff: false,
            },
            {
                id: "MSG-006",
                author: "Support",
                content: "Sure! Go to Settings > Privacy > Export Data and click the Download button. You'll receive an email with your data within 24 hours.",
                timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
                isStaff: true,
            },
            {
                id: "MSG-007",
                author: "User",
                content: "Got it, thank you so much!",
                timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
                isStaff: false,
            }
        ],
    },
    {
        id: "TKT-005",
        title: "Dashboard graphs not loading",
        description: "The analytics graphs on my dashboard have been showing a blank white box for the past week. I am using Chrome on Windows 11.",
        status: "in-progress",
        priority: "medium",
        category: "technical",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        messages: [
            {
                id: "MSG-008",
                author: "User",
                content: "The analytics graphs on my dashboard have been showing a blank white box for the past week. I am using Chrome on Windows 11.",
                timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                isStaff: false,
            },
            {
                id: "MSG-009",
                author: "Support",
                content: "Thanks for reporting this. Our team has identified the issue and is working on a fix. We'll update you shortly.",
                timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
                isStaff: true,
            }
        ],
    },
    {
        id: "TKT-006",
        title: "Cannot update billing address",
        description: "When I try to save my new billing address the page just refreshes and nothing changes. I have tried on Firefox and Chrome.",
        status: "open",
        priority: "medium",
        category: "billing",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        messages: [
            {
                id: "MSG-010",
                author: "User",
                content: "When I try to save my new billing address the page just refreshes and nothing changes. I have tried on Firefox and Chrome.",
                timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                isStaff: false,
            }
        ],
    },
    {
        id: "TKT-007",
        title: "Two-factor authentication not sending SMS",
        description: "I enabled 2FA last week but I am no longer receiving the SMS codes. I have checked my phone number and it is correct.",
        status: "resolved",
        priority: "medium",
        category: "auth",
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        messages: [
            {
                id: "MSG-011",
                author: "User",
                content: "I enabled 2FA last week but I am no longer receiving the SMS codes. I have checked my phone number and it is correct.",
                timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
                isStaff: false,
            },
            {
                id: "MSG-012",
                author: "Support",
                content: "We found an issue with our SMS provider affecting some users. We have switched you to email-based 2FA temporarily. Please check your email for codes.",
                timestamp: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
                isStaff: true,
            },
            {
                id: "MSG-013",
                author: "User",
                content: "Email codes are working fine now. Thanks for the quick fix!",
                timestamp: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
                isStaff: false,
            }
        ],
    },
    {
        id: "TKT-008",
        title: "Slow loading times on mobile",
        description: "The app takes over 10 seconds to load on my Android phone. It used to be fast but started slowing down after the last update.",
        status: "open",
        priority: "low",
        category: "technical",
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        messages: [
            {
                id: "MSG-014",
                author: "User",
                content: "The app takes over 10 seconds to load on my Android phone. It used to be fast but started slowing down after the last update.",
                timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
                isStaff: false,
            }
        ],
    },
];

export default mockTickets;