import React, { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { GeolocatedProps } from 'react-geolocated';
import moment from 'moment';

import { WeatherService } from 'services/weather.service';
import { GeocodeService } from 'services/geocode.service';
import { LocalStorageKey } from 'models/Common.model';
import { WeatherModel, WeatherPhrases, WeatherType } from 'models/Weather.model';
import { getEasterEggs, getEasterEggsByDate } from 'util/easterEggs';
import { formatDateAndTime } from 'util/date';
import { getEnumKeyByEnumValue } from 'util/enums';
import { Menu } from './Menu';
import { Hamburger } from './Hamburger';
import { headerVisible } from 'util/constants';
import './Header.scss';

export interface HeaderProps extends GeolocatedProps {}

const Header: FC<HeaderProps> = ({ coords }) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openStickyMenu, setOpenStickyMenu] = useState<boolean>(false);
  const [offset, setOffset] = useState<boolean>(false);
  const offsetRef = useRef(offset);
  const [eggs, setEggs] = useState<boolean>(false);
  const eggsRef = useRef(eggs);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPressed, false);
    document.addEventListener('click', handleClickPressed, false);
    window.onscroll = () => {
      const show = window.pageYOffset >= headerVisible;
      if (show !== offsetRef.current) {
        setOpenMenu(false);
        setOpenStickyMenu(false);
      }
      if (show && !offsetRef.current) {
        weatherUpdate();
      }
      offsetRef.current = show;
      setOffset(show);
    };
    return () => {
      document.removeEventListener('keydown', handleKeyPressed, false);
      document.removeEventListener('click', handleClickPressed, false);
    };
  }, []);

  const handleKeyPressed = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      eggsRef.current = false;
      setEggs(false);
    }
  };

  const handleClickPressed = () => {
    eggsRef.current = true;
    setEggs(true);
  };

  const weatherService = new WeatherService();
  const geocodeService = new GeocodeService();

  const shouldUpdateWeather = () => {
    const lastUpdated = localStorage.getItem(LocalStorageKey.WeatherUpdatedAt);
    return !lastUpdated || moment(lastUpdated).isBefore(moment().subtract(30, 'minute'));
  };

  const getWeather = (): string | null => {
    const storedWeather = localStorage.getItem(LocalStorageKey.CurrentWeather);
    if (storedWeather === null || !coords) return null;
    const weather: WeatherModel = JSON.parse(storedWeather as string);
    return `${getEnumKeyByEnumValue(WeatherType, weather.weather[0].main)}, ${Math.round(weather.main.temp)}°C, ${
      weather.main.humidity
    }% ${WeatherPhrases.Humidity}${weather.wind.speed > 3 ? `, ${WeatherPhrases.Windy}` : ''}`;
  };

  const toggleHover = async () => {
    setHovered(!hovered);
    await weatherUpdate();
  };

  const weatherUpdate = async () => {
    if (coords && coords.latitude && coords.longitude && shouldUpdateWeather()) {
      localStorage.setItem(LocalStorageKey.WeatherUpdatedAt, formatDateAndTime(new Date()));
      const {
        city: { name, country },
      } = await geocodeService.getLocation(coords.latitude, coords.longitude);
      const weather: WeatherModel = await weatherService.getWeather(
        `${name},${country}`,
        coords.latitude,
        coords.longitude
      );
      localStorage.setItem(LocalStorageKey.CurrentWeather, JSON.stringify(weather));
    }
  };

  const toggleMenu = () => setOpenMenu(!openMenu);

  const toggleStickyMenu = () => setOpenStickyMenu(!openStickyMenu);

  const getNameContainer = (mouseMove: boolean) => {
    return (
      <div
        className={'name-container'}
        onMouseEnter={mouseMove ? toggleHover : () => {}}
        onMouseLeave={mouseMove ? toggleHover : () => {}}
      >
        <div className={'prefix'}>Dr.</div>
        <div className={'name'}>Horváth Ádám</div>
        <div className={classNames({ ...getEasterEggsByDate() })} />
      </div>
    );
  };

  return (
    <>
      <div
        className={classNames('sticky-header w-100', {
          show: offsetRef.current,
          ...getEasterEggs(true, JSON.parse(localStorage.getItem(LocalStorageKey.CurrentWeather) as string)),
        })}
        onClick={weatherUpdate}
      >
        <div className={'w-100 h-100 position-relative'}>
          <div className={'container header-container'}>{getNameContainer(false)}</div>
          <Hamburger openMenu={openStickyMenu} toggleMenu={toggleStickyMenu} />
        </div>
        {coords ? <div className={'overlay'} /> : null}
      </div>
      {offsetRef.current ? null : (
        <header
          className={classNames({
            hovered,
            ...getEasterEggs(hovered, JSON.parse(localStorage.getItem(LocalStorageKey.CurrentWeather) as string)),
          })}
        >
          <div
            className={classNames('container header-container', {
              hideMenu: coords,
            })}
          >
            {getNameContainer(true)}
            <Menu className={coords ? 'hideMenu' : ''} />
          </div>
          <Hamburger openMenu={openMenu} toggleMenu={toggleMenu} />
          <div className={'weather-container'}>
            <div className={'weather-info'}>{getWeather()}</div>
          </div>
          {coords ? <div className={'overlay'} /> : null}
          {eggsRef.current ? (
            <div className={classNames('easter-egg-container', { ...getEasterEggsByDate() })} />
          ) : null}
        </header>
      )}
    </>
  );
};

export default Header;
