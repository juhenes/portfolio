import { useState, useEffect, useRef, useMemo } from 'react';
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiSun,
  FiMoon,
  FiTerminal,
  FiMenu,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import { CONTACT_DATA } from '../data/contactData';
import { useTheme } from '../hooks/useTheme';

interface TopBarProps {
  currentModule: string;
  onOpenMobileMenu: () => void;
}

export default function TopBar({
  currentModule,
  onOpenMobileMenu,
}: TopBarProps) {
  const [time, setTime] = useState<Date>(new Date());
  const [viewDate, setViewDate] = useState<Date>(new Date());
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setCalendarOpen(false);
      }
    }
    if (calendarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [calendarOpen]);

  const toggleCalendar = () => {
    if (!calendarOpen) {
      setViewDate(new Date());
    }
    setCalendarOpen((prev) => !prev);
  };

  const handlePrevMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatFullDate = (date: Date) => {
    return date.toLocaleDateString([], {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https://${url}`;
  };

  const githubUrl = formatUrl(CONTACT_DATA.github);
  const linkedinUrl = formatUrl(CONTACT_DATA.linkedin);
  const mailtoUrl = `mailto:${CONTACT_DATA.email}`;

  const getFullCalendarGrid = (vDate: Date, realNow: Date) => {
    const vy = vDate.getFullYear();
    const vm = vDate.getMonth() + 1;

    const nowY = realNow.getFullYear();
    const nowM = realNow.getMonth() + 1;
    const nowD = realNow.getDate();

    const monthName = new Date(vy, vm - 1, 1).toLocaleDateString([], {
      month: 'long',
    });

    const firstDayOfWeek = new Date(vy, vm - 1, 1).getDay();
    const daysInCurrentMonth = new Date(vy, vm, 0).getDate();
    const daysInPrevMonth = new Date(vy, vm - 1, 0).getDate();

    const prevMonthDays: number[] = [];
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      prevMonthDays.push(daysInPrevMonth - i);
    }

    const currentMonthDays: { day: number; isToday: boolean }[] = [];
    for (let d = 1; d <= daysInCurrentMonth; d++) {
      const isToday = vy === nowY && vm === nowM && d === nowD;
      currentMonthDays.push({ day: d, isToday });
    }

    const filledSoFar = prevMonthDays.length + currentMonthDays.length;
    const totalGridSize = filledSoFar <= 35 ? 35 : 42;
    const nextMonthDaysCount = totalGridSize - filledSoFar;
    const nextMonthDays: number[] = [];
    for (let i = 1; i <= nextMonthDaysCount; i++) {
      nextMonthDays.push(i);
    }

    return {
      year: vy,
      monthName,
      prevMonthDays,
      currentMonthDays,
      nextMonthDays,
    };
  };

  const grid = useMemo(() => {
    if (!calendarOpen) return null;
    return getFullCalendarGrid(viewDate, time);
  }, [calendarOpen, viewDate, time]);

  const weekDays = useMemo(
    () => ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    []
  );

  return (
    <header className="sticky top-0 z-30 w-full h-11 bg-neutral-950 border-b border-neutral-800/80 px-3 md:px-5 flex items-center justify-between select-none text-xs font-mono relative">
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenMobileMenu}
          aria-label="Toggle navigation menu"
          className="md:hidden flex items-center justify-center p-1 text-neutral-400 hover:text-dx0-orange transition-colors"
        >
          <FiMenu className="text-base text-dx0-orange" />
        </button>

        <div className="flex items-center gap-1.5 text-neutral-200 min-w-0">
          <FiTerminal className="text-dx0-orange text-xs shrink-0" />
          <span className="text-dx0-orange font-bold tracking-tight font-mono shrink-0">
            ~/dxo
          </span>
          <span className="text-neutral-600 font-semibold shrink-0">/</span>
          <span className="text-neutral-100 font-medium tracking-wide truncate max-w-[110px] xs:max-w-[180px] sm:max-w-none">
            {currentModule}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4" ref={calendarRef}>
        <div className="hidden sm:flex items-center gap-2.5 sm:gap-3 text-neutral-400">
          {CONTACT_DATA.email && (
            <a
              href={mailtoUrl}
              title={`Email: ${CONTACT_DATA.email}`}
              className="hover:text-dx0-orange transition-colors"
              aria-label="Email"
            >
              <FiMail className="text-sm text-dx0-orange" />
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`GitHub: ${CONTACT_DATA.github}`}
              className="hover:text-dx0-orange transition-colors"
              aria-label="GitHub"
            >
              <FiGithub className="text-sm text-dx0-orange" />
            </a>
          )}
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`LinkedIn: ${CONTACT_DATA.linkedin}`}
              className="hover:text-dx0-orange transition-colors"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="text-sm text-dx0-orange" />
            </a>
          )}
        </div>

        <div className="h-3 w-[1px] bg-neutral-800 hidden sm:block" />

        <button
          onClick={toggleCalendar}
          title="Click to view Calendar"
          aria-label={`Open Calendar - ${formatTime(time)}`}
          className="flex items-center gap-1 text-neutral-200 hover:text-dx0-orange transition-colors focus:outline-none cursor-pointer"
        >
          <span className="font-semibold tracking-wider text-xs">
            {formatTime(time)}
          </span>
        </button>

        <div className="h-3 w-[1px] bg-neutral-800" />

        <button
          onClick={toggleTheme}
          title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Theme`}
          aria-label="Toggle theme"
          className="relative inline-flex items-center justify-between w-10 h-5 rounded-full bg-neutral-900 border border-neutral-700/70 p-0.5 transition-colors focus:outline-none focus:ring-1 focus:ring-dx0-orange"
        >
          <span className="sr-only">Toggle theme</span>
          <span
            className={`flex items-center justify-center w-4 h-4 rounded-full text-dx0-orange shadow transform transition-transform duration-300 ${
              isDarkMode
                ? 'translate-x-0 bg-neutral-800'
                : 'translate-x-5 bg-neutral-200 text-dx0-orange'
            }`}
          >
            {isDarkMode ? (
              <FiMoon className="text-[9px] text-dx0-orange" />
            ) : (
              <FiSun className="text-[9px] text-dx0-orange" />
            )}
          </span>
        </button>

        {calendarOpen && grid && (
          <div className="absolute right-2 sm:right-12 top-12 z-50 w-64 max-w-[calc(100vw-24px)] bg-neutral-900/90 backdrop-blur-md border border-neutral-600/50 rounded-lg shadow-[0_12px_40px_rgba(0,0,0,0.85)] p-3 text-neutral-200 select-none animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2 mb-2">
              <button
                onClick={handlePrevMonth}
                aria-label="Previous month"
                title="Previous month"
                className="p-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <FiChevronLeft className="text-sm text-dx0-orange" />
              </button>
              <button
                onClick={() => setViewDate(new Date())}
                title="Reset to current month"
                className="font-bold text-xs text-white tracking-wide hover:text-dx0-orange transition-colors cursor-pointer"
              >
                {grid.monthName} {grid.year}
              </button>
              <button
                onClick={handleNextMonth}
                aria-label="Next month"
                title="Next month"
                className="p-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <FiChevronRight className="text-sm text-dx0-orange" />
              </button>
            </div>

            <div className="text-[11px] text-neutral-400 mb-2 font-mono text-center">
              {formatFullDate(time)}
            </div>

            <div className="grid grid-cols-7 gap-1 text-center font-bold text-[10px] text-neutral-500 mb-1">
              {weekDays.map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {grid.prevMonthDays.map((day) => (
                <div
                  key={`prev-${day}`}
                  className="py-1 text-[11px] text-neutral-600/70 select-none cursor-default"
                >
                  {day}
                </div>
              ))}

              {grid.currentMonthDays.map(({ day, isToday }) => (
                <div
                  key={`current-${day}`}
                  className={`py-1 rounded text-[11px] transition-colors ${
                    isToday
                      ? 'bg-dx0-orange text-black font-bold shadow'
                      : 'text-neutral-300 hover:bg-neutral-800 cursor-pointer'
                  }`}
                >
                  {day}
                </div>
              ))}

              {grid.nextMonthDays.map((day) => (
                <div
                  key={`next-${day}`}
                  className="py-1 text-[11px] text-neutral-600/70 select-none cursor-default"
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
