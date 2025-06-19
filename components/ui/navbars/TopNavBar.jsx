import { Smile, Bell, MessageCircle, UserCircle, ChevronDown} from "lucide-react";

export default function TopNavBar(){
    return(
            <div className="flex items-center justify-between w-full px-4 py-3 bg-gray-100 shadow-md">
                <div className="flex items-center gap-2">
                    <Smile className="w-6 h-6" />
                    <span className="text-lg font-bold">haioh</span>
                </div>
                
                <div className="flex items-center gap-4">
                    <Bell className="w-5 h-5" />
                    <MessageCircle className="w-5 h-5" />
                    <div className="flex items-center gap-1">
                        <ChevronDown className="w-4 h-4" />
                    </div>
                </div>
        </div>
    )
}