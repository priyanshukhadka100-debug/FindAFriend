import { addRipple } from '../../utils/ripple';

export default function ChatModal({
  show,
  onClose,
  myId,
  getUserChats,
  getAvatarColor,
  selectedChatId,
  setChatPartner,
  setSelectedChatId,
  chatPartner,
  setConfirmDeleteChat,
  confirmDeleteChat,
  chatThreads,
  unsendMessage,
  chatMessage,
  setChatMessage,
  sendMessage,
  deleteConversation,
}) {
  if (!show) return null;
  return (
                        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
                            <div className="bg-white rounded-2xl chat-modal w-full max-w-7xl h-[85vh] max-h-[85vh] shadow-xl flex flex-col overflow-hidden relative" onClick={e => e.stopPropagation()}>
                                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3.5 shrink-0 bg-white">
                                    <h3 className="font-bold text-lg text-gray-800">💬 Direct Messages</h3>
                                    <button onClick={() => { onClose(); setChatPartner(null); setSelectedChatId(null); }} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                                </div>
                                <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
                                    {/* Sidebar Chat List */}
                                    <div className="chat-sidebar border-r border-gray-200 flex flex-col bg-gray-50/50 shrink-0">
                                        <div className="p-3 border-b border-gray-200 bg-white">
                                            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Conversations</p>
                                        </div>
                                        <div className="flex-1 overflow-y-auto chat-list">
                                            {(() => {
                                                const chatList = getUserChats();
                                                if (chatList.length === 0) {
                                                    return <div className="flex flex-col items-center justify-center h-full text-center p-6 text-gray-400 text-xs font-normal"><p>No messages yet</p></div>;
                                                }
                                                return chatList.map(chat => (
                                                    <div 
                                                        key={chat.key} 
                                                        className={`chat-thread-item px-3.5 py-2.5 cursor-pointer flex items-center gap-2.5 border-b border-gray-100 ${selectedChatId === chat.otherId ? 'active' : ''}`}
                                                        onClick={() => { setChatPartner({ id: chat.otherId, name: chat.otherName }); setSelectedChatId(chat.otherId); }}
                                                    >
                                                        <div className={`avatar ${getAvatarColor(chat.otherName)}`}>{chat.otherName.charAt(0).toUpperCase()}</div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center justify-between">
                                                                <p className="font-semibold text-gray-800 text-xs truncate">{chat.otherName}</p>
                                                                {chat.isUnread && <span className="w-2 h-2 bg-red-500 rounded-full dm-badge shrink-0"></span>}
                                                            </div>
                                                            <p className="text-[11px] text-gray-500 truncate mt-0.5 font-normal">{chat.lastMsg ? chat.lastMsg.text : 'No messages'}</p>
                                                        </div>
                                                    </div>
                                                ));
                                            })()}
                                        </div>
                                    </div>

                                    {/* Active Chat Main Area */}
                                    <div className="chat-main flex flex-col bg-white">
                                        {chatPartner ? (
                                            <>
                                                {/* Active Chat Header */}
                                                <div className="flex items-center justify-between px-5 py-2.5 border-b border-gray-200 bg-gray-50/80 shrink-0">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className={`avatar ${getAvatarColor(chatPartner.name)} w-9 h-9 text-sm`}>{chatPartner.name.charAt(0).toUpperCase()}</div>
                                                        <div>
                                                            <p className="font-semibold text-gray-800 text-sm leading-tight">{chatPartner.name}</p>
                                                            <p className="text-[10px] text-gray-400 font-normal">ING College Student</p>
                                                        </div>
                                                    </div>
                                                    <button 
                                                        onClick={() => setConfirmDeleteChat(chatPartner.id)} 
                                                        className="text-xs font-medium text-red-600 hover:text-red-800 hover:bg-red-50 px-2.5 py-1 rounded-lg border border-red-200 transition flex items-center gap-1"
                                                        title="Delete Conversation"
                                                    >
                                                        <i className="fas fa-trash-can text-[10px]"></i>
                                                        <span className="hidden sm:inline">Delete Chat</span>
                                                    </button>
                                                </div>

                                                {/* Messages Thread */}
                                                <div className="flex-1 overflow-y-auto chat-messages px-5 py-3.5 space-y-2.5">
                                                    {(() => {
                                                        const threadKey = [myId, chatPartner.id].sort().join('|');
                                                        const thread = chatThreads[threadKey] || [];
                                                        if (thread.length === 0) return <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 text-xs font-normal"><p>No messages yet in this conversation</p></div>;
                                                        
                                                        return thread.map((m) => {
                                                            const isMine = m.from === myId;
                                                            return (
                                                                <div key={m.msgId} className={`flex items-end gap-1.5 ${isMine ? 'justify-end' : 'justify-start'}`}>
                                                                    {isMine && (
                                                                        <button 
                                                                            onClick={() => unsendMessage(threadKey, m.msgId)} 
                                                                            className="msg-unsend-btn text-xs text-red-400 hover:text-red-600 p-1 transition"
                                                                            title="Unsend Message"
                                                                        >
                                                                            <i className="fas fa-trash-can text-[11px]"></i>
                                                                        </button>
                                                                    )}
                                                                    <div className={`msg-container max-w-[75%] px-3.5 py-2 rounded-2xl text-xs md:text-sm font-normal ${isMine ? 'bubble-mine' : 'bubble-theirs'}`}>
                                                                        <p>{m.text}</p>
                                                                        <span className="text-[9px] opacity-70 block text-right mt-0.5">
                                                                            {new Date(m.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            );
                                                        });
                                                    })()}
                                                </div>

                                                {/* Message Input Box */}
                                                <div className="border-t border-gray-200 px-4 py-2.5 bg-gray-50 shrink-0">
                                                    <div className="flex gap-2">
                                                        <input 
                                                            type="text" 
                                                            value={chatMessage} 
                                                            onChange={e => setChatMessage(e.target.value)}
                                                            className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:ring-2 focus:ring-[#0D5C53] focus:border-transparent transition bg-white text-xs md:text-sm font-normal"
                                                            placeholder="Type a message..." 
                                                            onKeyDown={e => e.key === 'Enter' && sendMessage(chatPartner.id, chatMessage)} 
                                                        />
                                                        <button 
                                                            onClick={() => sendMessage(chatPartner.id, chatMessage)} 
                                                            onMouseDown={addRipple} 
                                                            className="ripple-btn btn-forest px-5 rounded-full font-semibold transition text-white text-xs py-2"
                                                        >
                                                            Send
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full text-center p-8 text-gray-400">
                                                <div className="text-5xl mb-3">💬</div>
                                                <p className="font-semibold text-gray-700 text-base">Select a conversation</p>
                                                <p className="text-xs mt-0.5 font-normal">Choose a student from the sidebar to chat</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* DELETE CONVERSATION OVERLAY DIRECTLY ON TOP OF CHAT MODAL */}
                                {confirmDeleteChat && (
                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-100 flex items-center justify-center p-4 rounded-2xl animate-fade-in" onClick={() => setConfirmDeleteChat(null)}>
                                        <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-gray-100 relative z-101" onClick={e => e.stopPropagation()}>
                                            <div className="text-center mb-4">
                                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2 text-red-600 text-xl">
                                                    <i className="fas fa-trash-can"></i>
                                                </div>
                                                <h3 className="text-base font-bold text-gray-800">Delete Conversation?</h3>
                                                <p className="text-xs text-gray-500 mt-1 font-normal">This will permanently delete all message history with this student for both participants.</p>
                                            </div>
                                            <div className="flex gap-2.5">
                                                <button onClick={() => setConfirmDeleteChat(null)} className="flex-1 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition text-xs font-medium">Cancel</button>
                                                <button onClick={() => deleteConversation(confirmDeleteChat)} className="flex-1 btn-danger py-2 rounded-xl font-medium text-xs">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
  );
}
